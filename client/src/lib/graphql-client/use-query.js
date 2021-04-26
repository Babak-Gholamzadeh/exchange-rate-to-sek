import { useContext, useState } from 'react';
import GraphQLContext from './Context';
import gqlRequest from './gql-request';

const useQuery = (query, { variables } = {}) => {
  const [callState, setCallState] = useState(false);
  const [queryState, setQueryState] = useState({
    loading: false,
  });

  const { baseURL, headers } = useContext(GraphQLContext);
  const newHeaders = typeof headers === 'function' ? headers() : headers;
  const request = gqlRequest({ url: baseURL, headers: newHeaders }, query);

  if (!callState) {
    setCallState(true);

    setQueryState({
      loading: true,
    });

    request(variables)
      .then(({ data, errors }) => {
        setQueryState({
          loading: false,
          error: errors,
          data,
        });
      })
      .catch(error => {
        setQueryState({
          loading: false,
          error,
        });
      });
  }

  return queryState;
};

export default useQuery;