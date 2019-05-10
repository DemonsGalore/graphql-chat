const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schemas');

// ExpressServer initialization
const app = express();
app.disable('x-powered-by');

// ApolloServer initialization
const server = new ApolloServer({ typeDefs: schema, resolvers  });
server.applyMiddleware({ app });

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`));
