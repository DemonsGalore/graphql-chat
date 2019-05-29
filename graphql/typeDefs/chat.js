const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Mutation {
    startChat(title: String, userIds: [ID!]!): Chat @auth
  }

  type Chat {
    id: ID!
    title: String!
    users: [User!]!
    messages: [Message!]!
    lastMessage: Message
    createdAt: String!
    updatedAt: String!
  }
`;
