const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { env } = require('../../config');

const login = ({ username, password }) => {
  if (username === env.DEFAULT_USERNAME && password === env.DEFAULT_PASSWORD) {
    return {
      token: jwt.sign({ username }, env.JWT_SECRET_KEY, { expiresIn: '7d' }),
    };
  }
  throw new AuthenticationError('Authentication failed!');
};

module.exports = login;
