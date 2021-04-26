import defaultConfig from './default-config';
import GraphQLContext from './Context';

const GraphQLProvider = ({ children, client = defaultConfig }) => {
  return (
    <GraphQLContext.Provider value={client}>
      {children}
    </GraphQLContext.Provider>
  )
};

export default GraphQLProvider;
