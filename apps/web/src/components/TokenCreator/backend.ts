export type TokenData = {
  address: string;
  createdBy: string | undefined;
  tokenLogo: string;
  rootHash: string;
  tokenName: string;
  tickerName: string;
};

export type TokenHolderData = {
  address: string;
  amount: string;
  tokenAddress: string;
  claimed: boolean;
  proofs: Record<string, any>;
};

export const storeData = async (
  tokenData: TokenData,
  tokenHolderData?: TokenHolderData[],
) => {
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tokenData }),
  });

  if (tokenHolderData) {
    for (const holderData of tokenHolderData) {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/token_holders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenHolderData: holderData }),
      });
    }
  }
};

export const createMerkleRoot = async (distribution: "" | string[][]) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/create-merkle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ distribution }),
    },
  );

  return response.json();
};

export const generateProofs = async (distribution: "" | string[][]) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/generate-proof`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ distribution }),
    },
  );

  return response.json();
};
