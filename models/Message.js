const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const messageSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  sender: {
    type: ObjectId,
    ref: 'users',
    required: true,
  },
  chat: {
    type: ObjectId,
    ref: 'chats',
    required: true,
  },
}, {
  timestamps: true
});

module.exports = Message = mongoose.model('messages', messageSchema);
