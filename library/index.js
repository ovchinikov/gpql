const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const { v1: uuid } = require('uuid');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Book = require('./models/books');
const Author = require('./models/author');
const User = require('./models/user');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
console.log(`connecting to ${MONGO_URI}`);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => console.log(`Error connecting to MongoDB, ${err}`));

const typeDefs = `
type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
}
type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genres:String): [Book!]!
    allAuthors: [Author!]!
    me: User!
  }

 type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    addAuthor(
      name: String!
      born: Int
    ): Author
    

    editAuthor (
        name: String!
        born: Int!
        ): Author
    createUser (
      username: String!, 
      favouriteGenre: String!
      ): User
    login (
      username: String!,
      password: String!
      ): Token
    
 }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id }).populate('author');
      } else if (args.genres) {
        return Book.find({ genres: { $in: args.genres } }).populate('author');
      }
      return Book.find({}).populate('author');
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: async (roots, args, { currentUser }) => {
      return currentUser;
    },
  },
  Mutation: {
    addBook: async (roots, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Unauthenticated!', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        });
      }
      return {
        ...book._doc,
        author,
      };
    },

    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      return author;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Unauthenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      console.log(author);
      if (!author) {
        return null;
      }
      author.born = args.born;
      console.log(author);
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Editing Author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError('Error saving user', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password == !'password') {
        throw new GraphQLError('Invalid Credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET,
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
