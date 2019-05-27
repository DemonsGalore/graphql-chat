const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server-express');

const User = require('../../models/User');
const validateSignUpInput = require('../../validation/signup');

module.exports = {
  Query: {
    user: (root, { id }, context, info) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }
      return User.findById(id);
    },
    users: (root, args, context, info) => {
      return User.find({});
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      const { errors, isValid } = await validateSignUpInput(args);
      // check validation
      if (!isValid) {
        console.log(errors);
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
      const user = await newUser.save();

      return user;
    }
  }
};
