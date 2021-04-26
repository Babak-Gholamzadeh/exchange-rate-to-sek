const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    isUserAuthenticated: UserAuthenticated!
    getCountries(name: String!): [Country]!
  }

  type UserAuthenticated {
    state: Boolean!
  }

  type Country {
    name: String!
    population: Int!
    currencies: [Currency]!
    flag: String!
  }

  type Currency {
    code: String!
    rateToSEK: Float
  }

  type Mutation {
    login(username: String!, password: String!): LoginOutput!
  }

  type LoginOutput {
    token: String
  }
`;

