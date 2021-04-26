const { env } = require('../config');
const axios = require('axios');

const fetchCountries = name =>
  axios
    .get(env.COUNTRY_API + escape(name), {
      params: {
        fields: 'name;population;currencies;flag'
      }
    })
    .then(({ data }) => data)
    .catch(() => []);

const getUniqueCurrencies = countries => {
  const result = new Set(countries.flatMap(({ currencies }) => {
    return currencies
      .filter(({ code }) => code && code !== '(none)')
      .map(({ code }) => code);
  }));
  // We need SEK rate for further step
  result.add('SEK');
  return [...result];
};

const fetchRates = symbols =>
  axios
    .get(env.RATE_API, {
      params: {
        access_key: env.API_ACCESS_TOKEN,
        symbols: symbols.join(','),
      }
    })
    .then(({ data: { rates } }) => rates);

const addRateToCountryCurrencies = (countries, rates) =>
  countries.map(({ currencies, ...rest }) => ({
    ...rest,
    currencies: currencies
      // Countires which has not valid currency code, should be removed!
      .filter(({ code }) => code && code !== '(none)')
      .map(({ code }) => ({
        code,
        // Convert the base of rates from EUR to SEK
        rateToSEK: (1 / rates.SEK * rates[code]) || 0
      })),
  }));

const getCountriesByName = async name => {
  let result = [];
  if (name) {
    const countries = await fetchCountries(name);
    const currencies = getUniqueCurrencies(countries);
    const rates = await fetchRates(currencies);
    result = addRateToCountryCurrencies(countries, rates);
  }
  return result;
};

module.exports = {
  getCountriesByName,
};
