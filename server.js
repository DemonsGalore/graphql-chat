const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schemas');

const { mongoURI, inProduction } = require('./config/keys');

// ExpressServer initialization
const app = express();
app.disable('x-powered-by');

// ApolloServer initialization
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  playground: inProduction
});
server.applyMiddleware({ app });

// connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB connected.');
    // start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT}`));
  })
.catch(error => console.log("Error", error));
