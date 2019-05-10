const crypto = require('crypto');

const db = {
  users: [
    { id: '1', email: 'andreas@stopat.de', username: 'demonsgalore', firstname: 'Andreas', lastname: 'Stopat', avatarUrl: 'http://image.png', createdAt: Date.now() },
    { id: '2', email: 'robert@stark.de', username: 'YoungWolf', firstname: 'Robert', lastname: 'Stark', avatarUrl: 'http://image.png', createdAt: Date.now() }
  ],
  messages: [
    { id: '1', userId: '1', body: 'Hello', createdAt: Date.now() },
    { id: '2', userId: '2', body: 'Hey', createdAt: Date.now() },
    { id: '3', userId: '1', body: 'Waddup?', createdAt: Date.now() },
  ]
};

module.exports = {
  Query: {
    user: (root, args, context, info) => {
      return db.users.find(user => user.id === args.id)
    },
    users: (root, args, context, info) => {
      return db.users;
    }
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      const { email, username, firstname, lastname, password } = args;
      const user = {
        id: crypto.randomBytes(10).toString('hex'),
        email,
        firstname,
        lastname,
        username,
        password
      };

      db.users.push(user)

      return user
    }
  }

};
