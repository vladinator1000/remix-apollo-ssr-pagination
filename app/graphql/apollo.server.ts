import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/index.js'
import { SchemaLink } from '@apollo/client/link/schema/index.js'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev/index.js'
import { AppLoadContext } from '@remix-run/cloudflare'

import { schema } from './schema.server'

loadDevMessages()
loadErrorMessages()

export function createGraphqlClientServer(context: AppLoadContext) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: ApolloLink.from([new SchemaLink({ schema, context })]),
  })
}
