const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(
      email: String!,
      username: String!,
      firstname: String!,
      lastname: String!,
      password: String!,
      confirmPassword: String!
    ): User
  }

  type User {
    id: ID!
    email: String!
    username: String!
    firstname: String!
    lastname: String!
    createdAt: String!
  }
`;
