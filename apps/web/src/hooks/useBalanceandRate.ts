import { useState, useEffect, useRef, useCallback } from "react";
import { formatEther } from "ethers/lib/utils";
import { debounce } from "lodash";

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
  const isFirstCall = useRef(true);

  const fetchData = useCallback(async () => {
    if (account && provider) {
      try {
        const balancePromise = getBalance(account, provider);
        const rateResponse = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=degen-base&vs_currencies=usd",
        );
        const rateData = await rateResponse.json();
        const fetchedBalance = await balancePromise;
        setBalance(fetchedBalance);
        setRate(rateData["degen-base"].usd);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [account, provider]);

  const debouncedFetchData = useCallback(
    debounce(() => {
      fetchData();
    }, 5000),
    [fetchData],
  );

  useEffect(() => {
    if (isFirstCall.current) {
      fetchData();
      isFirstCall.current = false;
    } else {
      debouncedFetchData();
    }
    return () => debouncedFetchData.cancel();
  }, [fetchData, debouncedFetchData]);

  return { balance, rate };
};
