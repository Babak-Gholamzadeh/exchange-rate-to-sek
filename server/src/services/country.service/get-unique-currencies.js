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

module.exports = getUniqueCurrencies;
