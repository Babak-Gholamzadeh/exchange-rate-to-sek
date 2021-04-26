import { useContext, useState } from 'react';
import GraphQLContext from './Context';
import gqlRequest from './gql-request';

const useMutation = (mutation, { variables: initialVariables, onCompleted, onError } = {}) => {
  const [mutationState, setMutationState] = useState({
    loading: false,
  });

  const { baseURL, headers } = useContext(GraphQLContext);
  const newHeaders = typeof headers === 'function' ? headers() : headers;
  const request = gqlRequest({ url: baseURL, headers: newHeaders }, mutation);

  const runMutation = ({ variables } = {}) => {
    setMutationState({
      loading: true,
    });

    request(variables || initialVariables)
      .then(({ data, errors }) => {
        if (errors)
          onError && onError(errors);
        else
          onCompleted && onCompleted(data);
        setMutationState({
          loading: false,
          error: errors,
          data,
        });
      })
      .catch(error => {
        onError && onError(error);
        setMutationState({
          loading: false,
          error,
        });
      });
  };

  return [runMutation, mutationState];
};

export default useMutation;