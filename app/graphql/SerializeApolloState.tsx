import { useContext } from 'react'

import { ApolloStateContext } from './apolloStateContext'


export let SerializeApolloState = () => {
  let state = useContext(ApolloStateContext)

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__APOLLO_STATE__=${JSON.stringify(
          state,
        ).replace(/</g, '\\u003c')};`,
      }}
    />
  )
}