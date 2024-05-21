/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { ApolloProvider } from "@apollo/client/index.js";
import { getDataFromTree } from "@apollo/client/react/ssr/index.js";

import { createGraphqlClientServer } from "./graphql/apollo.server";
import { ApolloStateContext } from "./graphql/apolloStateContext";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext
) {
  let gqlClient = createGraphqlClientServer(loadContext)

  let app = (
    <ApolloProvider client={gqlClient}>
      <RemixServer context={remixContext} url={request.url} />
    </ApolloProvider>
  )

  await getDataFromTree(app)
  let gqlState = gqlClient.extract()

  app = (
    <ApolloStateContext.Provider value={gqlState}>
      {app}
    </ApolloStateContext.Provider>
  )

  let html = renderToString(
    app,
  );


  responseHeaders.set("Content-Type", "text/html");
  return new Response(html, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
