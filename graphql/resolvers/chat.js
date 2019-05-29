const { UserInputError } = require('apollo-server-express');
const { Chat, Message, User } = require('../../models');

module.exports = {
  Query: {

  },
  Mutation: {
    startChat: async (root, args, { req }, info) => {
      const { userId } = req.session;
      const { title, userIds } = args;

      const idsFound = await User.where('_id').in(userIds).countDocuments();

      if (idsFound !== userIds.length) {
        throw new UserInputError('One or more User IDs are invalid.');
      }

      userIds.push(userId);

      const chat = await Chat.create({ title, users: userIds });

      await User.updateMany({ _id: { '$in': userIds } }, {
        $push: { chats: chat }
      });

      return chat;
    }
  },
  Chat: {
    messages: (chat, args, context, info) => {
      return Message.find({ chat: chat.id });
    },
    users: async (chat, args, context, info) => {
      await chat.populate('users').execPopulate();

      return chat.users;
    },
    lastMessage: async (chat, args, context, info) => {
      await chat.populate('lastMessage').execPopulate();

      return chat.lastMessage;
    }
  }
};
