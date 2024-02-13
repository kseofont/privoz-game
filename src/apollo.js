// src/apollo.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://privoz.lavron.dev/graphql',
    cache: new InMemoryCache(),
});

export default client;
