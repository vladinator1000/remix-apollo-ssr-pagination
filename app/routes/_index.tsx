import { useQuery } from "@apollo/client/index.js";

import { getLatestEventsDocument } from "../graphql/getLatestEvents.query";


export default function Index() {
  let { data } = useQuery(getLatestEventsDocument)
  let edges = data?.getLatestEvents.edges
  console.log(data);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Hello, world!</h1>
      {edges?.map((edge) => <li key={edge.node.slug}>{JSON.stringify(edge.node)}</li>)}
    </div>
  );
}
