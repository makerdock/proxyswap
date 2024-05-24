import { useState, useEffect } from "react";
import { formatEther } from "ethers/lib/utils";

const getBalance = async (address: string, provider: any) => {
  const balance = await provider.getBalance(address);
  return formatEther(balance);
};

export const useBalanceAndRate = (
  account: string | null | undefined,
  provider: any,
) => {
  const [balance, setBalance] = useState<string>("");
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (account && provider) {
        const [balance, response] = await Promise.all([
          getBalance(account, provider),
          fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=degen-base&vs_currencies=usd",
          ),
        ]);
        const data = await response.json();
        setBalance(balance);
        setRate(data["degen-base"].usd);
      }
    };
    fetchData();
  }, [account, provider]);

  return { balance, rate };
};
