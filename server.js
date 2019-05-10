const { ApolloServer, gql } = require('apollo-server');

// const express = require('express');
// const graphqlHTTP = require('express-graphql');
// const { graphql, buildSchema } = require('graphql');
const crypto = require('crypto');

const db = {
  users: [
    { id: '1', email: 'andreas@stopat.de', name: 'Andreas', avatarUrl: 'http://image.png' },
    { id: '2', email: 'ellen@richter.de', name: 'Charlott', avatarUrl: 'http://image.png' }
  ],
  messages: [
    { id: '1', userId: '1', body: 'Hello', createdAt: Date.now() },
    { id: '2', userId: '2', body: 'Hey', createdAt: Date.now() },
    { id: '3', userId: '1', body: 'Waddup?', createdAt: Date.now() },
  ]
};

// class User {
//   constructor(user) {
//     Object.assign(this, user)
//   }
//
//   messages() {
//     return db.messages.filter(message => message.userId === this.id);
//   }
// }

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }

  type Mutation {
    addUser(email: String, name: String!): User
  }

  type User {
    id: ID!
    email: String!
    name: String!
    avatarUrl: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    body: String!
    createdAt: String!
  }
`;

const resolvers = {
  Query: {
    users: () => db.users,
    user: (root, { id }) => db.users.find(user => user.id === id),
    messages: () => db.messages,
  },
  Mutation: {
    addUser: (root, { email, name }) => {
      const user = {
        id: crypto.randomBytes(10).toString('hex'),
        email,
        name
      };
      db.users.push(user);

      return user;
    }
  },
  User: {
    messages: user => db.messages.filter(message => message.userId === user.id)
  }
};

// const app = express();

// // graphQL initialization
// app.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue,
//   graphiql: true
// }));
//
// // start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
