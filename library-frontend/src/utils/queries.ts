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
      author
      published
      title
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
      id
      title
      author
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
