import { useState, useEffect } from "react";

export type TokenData = {
  id: number;
  created_at: string;
  address: string;
  token_address: string;
  claimed: boolean;
  proofs: string[];
  amount: number;
  tokens: {
    token_name: string;
    token_logo: string;
    ticker_name: string;
  };
};

const useFetchTokenData = (account: string | undefined) => {
  const [tokenData, setTokenData] = useState<TokenData[]>([]);
  const [tokensLoading, setTokensLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!account) return;
        setTokensLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/get-unclaimed-tokens?address=${account}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTokenData(data.tokenData);
      } catch (error) {
        console.error(error);
      } finally {
        setTokensLoading(false);
      }
    };

    fetchData();
  }, [account]);

  return { tokenData, setTokenData, tokensLoading };
};

export default useFetchTokenData;
