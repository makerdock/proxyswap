import { ApolloClient, InMemoryCache } from "@apollo/client";
const GRAPHQL_ENDPOINT =
  "https://proxy-airstack-subgraph-api.vercel.app/api/subgraph";

//TODO: Figure out how to make ApolloClient global variable
export default new ApolloClient({
  connectToDevTools: true,
  uri: GRAPHQL_ENDPOINT,
  headers: {
    Authorization: "14327dfc1f6574958bb68100a310f652b",
  },
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
    },
  },
});
