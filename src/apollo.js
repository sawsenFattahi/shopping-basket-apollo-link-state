import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import resolvers from './resolvers';

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults: {
    monsterList: [],
    totalPrice: 0,
  },
  resolvers,
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, new HttpLink()]),
  cache,
});

export default client;

