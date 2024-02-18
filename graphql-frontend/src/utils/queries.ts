import { gql } from '@apollo/client';

export const GET_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

export const CREATE_PERSON = gql`
  mutation addPerson(
    $name: String!
    $city: String!
    $street: String!
    $phone: String!
  ) {
    addPerson(name: $name, city: $city, street: $street, phone: $phone) {
      id
      name
      address {
        city
        street
      }
      phone
    }
  }
`;

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;
