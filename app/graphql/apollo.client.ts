import { ApolloClient } from '@apollo/client/core/index.js'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev/index.js'
import { createCache } from './cache'

if (!import.meta.env.PROD) {
  loadDevMessages()
  loadErrorMessages()
}

export let graphqlClient = new ApolloClient({
  uri: '/api/graphql',
  cache: createCache(),
})
