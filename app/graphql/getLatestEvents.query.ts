import { gql } from '@apollo/client/index.js'

export let getLatestEventsDocument = gql`
  query getLatestEvents($pagination: ForwardPagination!, $cityId: Int!) {
    getLatestEvents(pagination: $pagination, cityId: $cityId) {
      edges {
        node {
          ...EventDetails
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  fragment EventDetails on Event {
    __typename
    id
    name
    slug
  }
`
