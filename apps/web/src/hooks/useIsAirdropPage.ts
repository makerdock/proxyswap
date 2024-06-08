import { useLocation } from "react-router-dom";

export function useIsAirdropPage() {
  const { pathname } = useLocation();
  return pathname.startsWith("/airdrop");
}
