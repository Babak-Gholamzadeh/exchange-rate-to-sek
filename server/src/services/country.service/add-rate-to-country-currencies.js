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

module.exports = addRateToCountryCurrencies;
