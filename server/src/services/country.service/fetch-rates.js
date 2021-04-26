const { env } = require('../../config');
const axios = require('axios');

const fetchRates = symbols =>
  axios
    .get(env.RATE_API, {
      params: {
        access_key: env.API_ACCESS_TOKEN,
        symbols: symbols.join(','),
      }
    })
    .then(({ data: { rates } }) => rates);

module.exports = fetchRates;
