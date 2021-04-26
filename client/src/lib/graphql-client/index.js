import defaultConfig from './default-config';
export { default as GraphQLProvider } from './Provider';
export { default as gql } from './gql';
export { default as useQuery } from './use-query';
export { default as useLazyQuery } from './use-lazy-query';
export { default as useMutation } from './use-mutation';

const GraphQLClient = (options = defaultConfig) => {
  return { ...options };
};

export default GraphQLClient;
