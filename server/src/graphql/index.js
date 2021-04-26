const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

const graphQLServer = app => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
      return {
        token: req.headers.authorization?.split(' ')[1],
      };
    },
  });
  
  server.applyMiddleware({ app });
};

module.exports = graphQLServer;
