const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server-express');

const User = require('../../models/User');
const validateSignUpInput = require('../../validation/signup');
const validateSignInInput = require('../../validation/signin');
const {
  checkSignedIn,
  checkSignedOut,
  attemptSignIn,
  signOut
} = require('../auth');

module.exports = {
  Query: {
    me: (root, args, { req }, info) => {
      checkSignedIn(req);

      return User.findById(req.session.userId);
    },
    user: (root, { id }, { req }, info) => {
      checkSignedIn(req);

      if (mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }
      return User.findById(id);
    },
    users: (root, args, context, info) => {
      // isAuth(req);

      return User.find({});
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      const { errors, isValid } = await validateSignUpInput(args);
      // check validation
      if (!isValid) {
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

      req.session.userId = user.id;

      return user;
    },
    signIn: async (root, args, { req, res }, info) => {
      const { userId } = req.session;

      if (userId) {
        return User.findById(userId);
      }

      const { username, password } = args;
      const { errors, isValid } = await validateSignInInput(args);

      // check validation
      if (!isValid) {
        return errors;
      }

      const user = await attemptSignIn(username, password);

      req.session.userId = user.id;

      return user;
    },
    signOut: (root, args, { req, res }, info) => {
      checkSignedIn(req);
      return signOut(req, res);
    }
  }
};
