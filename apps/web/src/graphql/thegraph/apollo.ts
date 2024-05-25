import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { ChainId } from "@uniswap/sdk-core";

import store from "../../state/index";

const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  [ChainId.DEGEN]:
    "https://proxy-airstack-subgraph-api.vercel.app/api/subgraph",
};

const CHAIN_BLOCK_SUBGRAPH_URL: Record<number, string> = {
  [ChainId.DEGEN]: "http://127.0.0.1:8000/subgraphs/name/proxyswap/blocks",
};

const httpLink = new HttpLink({ uri: CHAIN_SUBGRAPH_URL[ChainId.DEGEN] });

// This middleware will allow us to dynamically update the uri for the requests based off chainId
// For more information: https://www.apollographql.com/docs/react/networking/advanced-http-networking/
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const chainId = store.getState().application.chainId;

  operation.setContext(() => ({
    uri:
      chainId && CHAIN_SUBGRAPH_URL[chainId]
        ? CHAIN_SUBGRAPH_URL[chainId]
        : CHAIN_SUBGRAPH_URL[ChainId.DEGEN],
  }));

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export const chainToApolloClient: Record<
  number,
  ApolloClient<NormalizedCacheObject>
> = {
  [ChainId.DEGEN]: new ApolloClient({
    cache: new InMemoryCache(),
    uri: CHAIN_SUBGRAPH_URL[ChainId.DEGEN],
  }),
};

export const chainToApolloBlockClient: Record<
  number,
  ApolloClient<NormalizedCacheObject>
> = {
  [ChainId.DEGEN]: new ApolloClient({
    uri: CHAIN_BLOCK_SUBGRAPH_URL[ChainId.DEGEN],
    cache: new InMemoryCache(),
  }),
};
