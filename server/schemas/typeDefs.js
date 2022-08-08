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

  type Friend{
    name: String,
    email: String,

  }

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    avatar: String
    friends: [Friend]
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

  input FriendInput {
    name: String!
    email: String!
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
    removeCharacterData(profileId: ID!): Profile
    addCharacterData(profileId: ID!, data: DataInput!): Profile
    getCharacterData(profileId: ID!): Profile
    updateCharacterData(profileId:ID!, data: DataInput!): Profile
    addFriend(profileId: ID!, FriendInput: FriendInput!): Profile
  }
`;

module.exports = typeDefs;
