const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { env } = require('../../config');

const tokenValidator = token => {
  try {
    jwt.verify(token, env.JWT_SECRET_KEY);
    return {
      state: true
    };
  } catch (err) {
    throw new AuthenticationError('Authentication failed!');
  }
};

module.exports = tokenValidator;