import { createContext } from 'react';
import defaultConfig from './default-config';

const GraphQLContext = createContext(defaultConfig);

export default GraphQLContext;
