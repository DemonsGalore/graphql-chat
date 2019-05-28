const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: 'Email has already been taken.'
    }
  },
  username: {
    type: String,
    validate: {
      validator: username => User.doesntExist({ username }),
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

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0;
}

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

module.exports = User = mongoose.model('users', userSchema);
