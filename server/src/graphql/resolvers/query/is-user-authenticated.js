const { authService } = require('../../../services');

const isUserAuthenticated = (_, __, { token }) => {
  return authService.tokenValidator(token);
};

module.exports = isUserAuthenticated;
