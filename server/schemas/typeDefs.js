const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Fields {
    latency: Int!,
    correct: Int!,
    incorrect: Int!
    count: Int!
  }

  type Data {
    character: String!,
    fields: Fields!
  }

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    data: [Data]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  input FieldInput {
    latency: Int!
    correct: Int!
    incorrect: Int!
    count: Int!
  }

  input DataInput {
    character: String!,
    fields: FieldInput!
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    addCharacterData(profileId: ID!, data: DataInput!): Profile
    updateCharacterData(profileId:ID!, data: DataInput!): Profile
  }
`;

module.exports = typeDefs;
