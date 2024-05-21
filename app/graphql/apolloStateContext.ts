import { NormalizedCacheObject } from '@apollo/client'
import { createContext } from 'react'

let isBrowser = typeof window !== 'undefined'

let initialState: NormalizedCacheObject = isBrowser
  ? window.__APOLLO_STATE__
  : {}

export let ApolloStateContext = createContext(initialState)
