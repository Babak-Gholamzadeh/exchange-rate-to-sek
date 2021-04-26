const { env } = require('../../config');
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

module.exports = fetchCountries;
