import { useLocation } from "react-router-dom";

export function useIsLaunchPage() {
  const { pathname } = useLocation();
  return (
    pathname.startsWith("/launch") ||
    pathname.startsWith("/launch/step1") ||
    pathname.startsWith("/launch/step2") ||
    pathname.startsWith("/launch/step3") ||
    pathname.startsWith("/launch/confirmation") ||
    pathname.startsWith("/launch/success")
  );
}
