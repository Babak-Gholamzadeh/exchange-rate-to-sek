const { countryService, authService } = require('../../../services');

const getCountries = async (_, { name }, { token }) => {
  authService.tokenValidator(token);
  return countryService.getCountriesByName(name);
};

module.exports = getCountries;
