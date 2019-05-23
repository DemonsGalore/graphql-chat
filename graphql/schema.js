
const bcrypt = require('bcryptjs');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

const User = require('../models/User');
const validateSignUpInput = require('../validation/signup');


const UserType = new GraphQLObjectType({
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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    signUp: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parents, args) {
        const { errors, isValid } = validateSignUpInput(args);
        // console.log(errors);
        // console.log(isValid);
        // check validation
        if (!isValid) {
          // return res.status(400).json(errors);
          console.log("MOEP");
          return errors;
        }

        // create new user
        const { email, username, firstname, lastname, password } = args;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
          email,
          username,
          firstname,
          lastname,
          password: hashedPassword,
        });
        // console.log(newUser);
        const user = await newUser.save();
        // console.log(user);

        return user;
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
