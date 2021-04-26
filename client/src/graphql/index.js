import { gql } from '../lib/graphql-client';

export const LOGIN = gql`
  mutation login($username:String!, $password:String!){
    login(username: $username, password:$password) {
      token
    }
  }
`;

export const IS_USER_AUTHENTICATED = gql`
  query {
    isUserAuthenticated{
      state
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries($name:String!){
    getCountries(name:$name){
      name
      population
      flag
      currencies {
        code
        rateToSEK
      }
    }
  }
`;
