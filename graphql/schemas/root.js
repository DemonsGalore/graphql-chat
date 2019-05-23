// const { gql } = require('apollo-server-express');
//
// module.exports = gql`
//   type Query {
//     _: String
//   }
//
//   type Mutation {
//     _: String
//   }
//
//   type Subscription {
//     _: String
//   }
// `;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {}
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {}
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
