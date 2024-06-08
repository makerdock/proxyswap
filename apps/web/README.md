# Proxyswap Labs Web Interface

## Accessing the Proxyswap Interface

To access the Proxyswap Interface, visit [proxyswap.tips](https://proxyswap.tips).

## Running the interface locally

```bash
yarn
yarn web start
```

## Unsupported tokens

Check out `useUnsupportedTokenList()` in [src/state/lists/hooks.ts](./src/state/lists/hooks.ts) for blocking tokens in your instance of the interface.

You can block an entire list of tokens by passing in a tokenlist like [here](./src/constants/lists.ts)