import React from 'react';
import ReactDom from 'react-dom';
import GraphQLClient, { GraphQLProvider } from './lib/graphql-client';
import WebStorage from './lib/web-storage';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './index.scss';

const client = GraphQLClient({
  baseURL: process.env.REACT_APP_GRAPHQL_SERVER_URL,
  headers: () => ({
    Authorization: 'Bearer ' + WebStorage.get('token'),
  }),
});

ReactDom.render(
  <GraphQLProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GraphQLProvider>,
  document.getElementById('root'),
);

