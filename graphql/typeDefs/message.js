const { gql } = require('apollo-server-express');

module.exports = gql`
  type Message {
    id: ID!
    body: String!
    sender: User!
    createdAt: String!
    updatedAt: String!
  }
`;
