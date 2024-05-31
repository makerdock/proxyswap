import { useLocation } from "react-router-dom";

export function useIsClaimPage() {
  const { pathname } = useLocation();
  return (
    pathname.startsWith("/claim") 
  );
}
