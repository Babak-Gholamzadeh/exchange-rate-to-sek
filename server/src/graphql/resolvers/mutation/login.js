const { authService } = require('../../../services');

const login = (_, { username, password }) => {
  return authService.login({username, password});
};

module.exports = login;
