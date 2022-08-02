import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query Query {
    profiles {
      email
    }
  }
  `

export const ADD_CHAR = gql`
  mutation addCharacterData($profileId: ID!, $character: String!, $latency: String!, $correct: String!, $count: String!) {
    addCharacterData( profileId: $profileId, character: $character, latency: $latency, correct: $correct, count: $count)
  }
  `


