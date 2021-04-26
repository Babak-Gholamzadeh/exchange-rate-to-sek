import axios from 'axios';

const gqlRequest = ({ url, headers }, query) => (variables = {}) => {
  const newHeaders = { 'Content-Type': 'application/json' };
  if (typeof headers === 'function')
    Object.assign(newHeaders, headers());
  else
    Object.assign(newHeaders, headers);

  return axios({
    method: 'POST',
    url,
    data: {
      query,
      variables,
    },
    headers: newHeaders
  }).then(({ data }) => data);
}

export default gqlRequest;
