import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query getAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const GET_BOOKS = gql`
  query allBooks {
    allBooks {
      id
      author {
        id
        name
      }
      published
      title
      genres
    }
  }
`;

export const GET_BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      id
      author {
        id
        name
      }
      published
      title
      genres
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      username
      favouriteGenre
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      id
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
