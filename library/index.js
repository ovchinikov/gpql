const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Book = require('./models/books');
const Author = require('./models/author');

require('dotenv').config();

const typeDefs = `
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
  }

 type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor (
        name: String!
        born: Int!
        ): Author
    
 }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genres) {
        return books;
      }
      if (args.author && args.genres) {
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genres),
        );
      }
      if (args.author) {
        return books.filter((book) => book.author === args.author);
      }
      if (args.genres) {
        return books.filter((book) => book.genres.includes(args.genres));
      }
    },
    allAuthors: () => {
      return authors.map((author) => {
        return {
          ...author,
          bookCount: books.filter((book) => book.author === author.name).length,
        };
      });
    },
  },
  Mutation: {
    addBook: (roots, args) => {
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      if (!authors.find((author) => author.name === args.author)) {
        authors = authors.concat({ name: args.author, id: uuid() });
      }

      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);

      if (!author) {
        return null;
      }
      const updatedAuthor = { ...author, born: args.born };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author,
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
