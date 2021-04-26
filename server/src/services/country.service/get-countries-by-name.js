const fetchCountries = require('./fetch-countries');
const getUniqueCurrencies = require('./get-unique-currencies');
const fetchRates = require('./fetch-rates');
const addRateToCountryCurrencies = require('./add-rate-to-country-currencies');

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

module.exports = getCountriesByName;
