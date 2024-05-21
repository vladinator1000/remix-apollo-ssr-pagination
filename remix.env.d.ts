/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

import { NormalizedCacheObject } from '@apollo/client'

interface Window {
  __APOLLO_STATE__: NormalizedCacheObject
}
