import { useContext, useState } from 'react';
import GraphQLContext from './Context';
import gqlRequest from './gql-request';

const useLazyQuery = (lazyQuery, { variables: initialVariables } = {}) => {
  const [lazyQueryState, setLazyQueryState] = useState({
    loading: false,
  });

  const { baseURL, headers } = useContext(GraphQLContext);
  const newHeaders = typeof headers === 'function' ? headers() : headers;
  const request = gqlRequest({ url: baseURL, headers: newHeaders }, lazyQuery);

  const runLazyQuery = ({ variables } = {}) => {
    setLazyQueryState({
      loading: true,
    });

    request(variables || initialVariables)
      .then(({ data, errors }) => {
        setLazyQueryState({
          loading: false,
          error: errors,
          data,
        });
      })
      .catch(error => {
        setLazyQueryState({
          loading: false,
          error,
        });
      });
  };

  return [runLazyQuery, lazyQueryState];
};

export default useLazyQuery;