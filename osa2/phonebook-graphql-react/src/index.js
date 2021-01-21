import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  gql,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'http://localhost:4000' }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
