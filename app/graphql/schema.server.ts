import { AppLoadContext } from '@remix-run/cloudflare'
import { createSchema } from 'graphql-yoga'

const typeDefinitions = /* GraphQL */ `
  type Query {
    getLatestEvents(
      pagination: ForwardPagination!
      cityId: Int!
    ): EventConnection!
  }

  scalar Cursor

  interface Connection {
    edges: [Edge!]!
    totalCount: Int!
    pageInfo: PageInfo!
  }

  interface Edge {
    node: Node!
    cursor: Cursor!
  }

  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: Cursor
  }

  input ForwardPagination {
    first: Int!
    after: Cursor
  }

  type EventConnection implements Connection {
    edges: [EventEdge!]!
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type EventEdge implements Edge {
    node: Event!
    cursor: Cursor!
  }

  type Event implements Node {
    id: ID!
    name: String
    slug: String!
  }
`

const resolvers = {
  Query: {
    getLatestEvents: async () => {
      let data = await import('./getLatestEventsData.json')
      return data.getLatestEvents
    },
  },
}

export const schema = createSchema<AppLoadContext>({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
})
