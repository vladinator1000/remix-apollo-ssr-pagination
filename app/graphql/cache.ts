import { InMemoryCache } from '@apollo/client/core/index.js'
import { relayStylePagination } from '@apollo/client/utilities/index.js'

export function createCache() {
  let cache = new InMemoryCache({
    possibleTypes: { Profile: ['Artist', 'Venue', 'Promoter', 'User'] },
    typePolicies: {
      Query: {
        fields: {
          getLatestEvents: relayStylePagination(['cityId']),
        },
      },
    },
  })

  if (typeof window !== 'undefined' && window.__APOLLO_STATE__) {
    cache = cache.restore(window.__APOLLO_STATE__)
  }

  return cache
}
