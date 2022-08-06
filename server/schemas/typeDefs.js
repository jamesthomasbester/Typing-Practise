const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Data {
    character: String!,
    latency: Int!,
    correct: Int!,
    count: Int!
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

  input DataInput {
    character: String!,
    latency: Int!,
    correct: Int!,
    count: Int!
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    addCharacterData(profileId: ID!, data: DataInput!): Data
    updateCharacterData(profileId:ID!, data: DataInput!): Data!
  }
`;

module.exports = typeDefs;
