const mongoose = require('mongoose');
const User = require('./User');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const chatSchema = new Schema({
  title: {
    type: String,
  },
  users: [{
    type: ObjectId,
    ref: 'users',
    required: true,
  }],
  lastMessage: {
    type: ObjectId,
    ref: 'messages',
  },
}, {
  timestamps: true
});

const USER_LIMIT = 5;

// hashes the password before it is stored in the database
chatSchema.pre('save', async function () {
  console.log("TEST", this.users);
  if (!this.title) {
    const users = await User.find({ _id: { $in: this.users } }).limit(USER_LIMIT).select('firstname');
    let title = users.map(user => user.firstname).join(', ')

    if (this.users.length > USER_LIMIT) {
      title += '...'
    }

    this.title = title
  }
});

module.exports = Chat = mongoose.model('chats', chatSchema);
