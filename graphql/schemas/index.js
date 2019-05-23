const root = require('./root');
// const user = require('./user');
//
// module.exports = [
//   root,
//   user
// ];

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

const User = require('../../models/User');

const user = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    role: { type: GraphQLString },
    // INFO: never add password here!
  })
});



module.exports = [
  root,
  user
];
