const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: email => User.doesntExist({ email }),
      // validator: async email => {
      //   return await User.find({ email }).countDocuments() === 0;
      // },
      message: 'Email has already been taken.'
    }
  },
  username: {
    type: String,
    validate: {
      validator: username => User.doesntExist({ username }),
      // validator: async username => {
      //   return await User.find({ username }).countDocuments() === 0;
      // },
      message: 'Username has already been taken.'
    }
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
}, {
  timestamps: true
});

userSchema.statics.doesntExist = async (options) => {
  console.log(options);
  return await User.find({ options }).countDocuments() === 0;
}

module.exports = User = mongoose.model('users', userSchema);
