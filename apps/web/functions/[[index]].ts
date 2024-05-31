/* eslint-disable import/no-unused-modules */
import { paths } from "../src/pages/paths";

function doesMatchPath(path: string): boolean {
  const regexPaths = paths.map(
    (p) => "^" + p.replace(/:[^/]+/g, "[^/]+").replace(/\*/g, ".*") + "$",
  );

  return regexPaths.some((regex) => new RegExp(regex).test(path));
}

export const onRequest: PagesFunction = async ({ request, next }) => {
  const requestURL = new URL(request.url);
  const imageUri =
    requestURL.origin + "/images/1200x630_Rich_Link_Preview_Image.png";
  const data = {
    title: "Proxyswap",
    image: imageUri,
    url: request.url,
    description: "Swap or provide liquidity on Degen L3",
  };
  const res = next();
  try {
    return new Response(null, {
      status:
        doesMatchPath(requestURL.pathname) || requestURL.pathname.includes(".")
          ? 200
          : 404,
    });
  } catch (e) {
    return res;
  }
};
