import React from 'react'
import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  split,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import { getMainDefinition } from '@apollo/client/utilities'

import App from './App'

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null
    }
  })

  return forward(operation)
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(splitLink, authMiddleware)
})

const RedditApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

export default RedditApp
