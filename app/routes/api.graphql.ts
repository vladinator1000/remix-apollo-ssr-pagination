import { AppLoadContext, type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { createYoga } from 'graphql-yoga'

import { schema } from '../graphql/schema.server'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  let yoga = createYoga<AppLoadContext>({
    schema,
  })

  return yoga.fetch(request, context)
}
