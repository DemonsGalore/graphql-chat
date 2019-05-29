const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const chatSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  users: [{
    type: ObjectId,
    ref: 'users',
    required: true,
  }],
  lastMessage: {
    type: ObjectId,
    ref: 'messages',
    required: true,
  },
}, {
  timestamps: true
});

module.exports = Chat = mongoose.model('chats', chatSchema);
