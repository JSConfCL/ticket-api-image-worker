// @ts-expect-error no type definitions for satori/wasm
import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { loadGoogleFont } from "./googleFonts";
// @ts-expect-error no type definitions for .wasm modules
import yogaWasm from "./yoga.wasm";
// @ts-expect-error no type definitions for .wasm modules
import resvgWasm from "./resvg.wasm";
import { TicketHeight, TicketWidth } from "./constants";
import { Env } from "./sharedTypes";

const genModuleInit = () => {
  let isInit = false;
  return async () => {
    if (isInit) {
      return;
    }

    // @ts-expect-error no type definitions for @resvg/resvg-wasm
    init(await initYoga(yogaWasm));
    await initWasm(resvgWasm);
    isInit = true;
  };
};
const moduleInit = genModuleInit();

export const createImage = async (node: JSX.Element, env: Env) => {
  await moduleInit();
  const inter = await loadGoogleFont({
    family: "Inter",
    weight: 400,
  });
  const interBold = await loadGoogleFont({
    family: "Inter",
    weight: 800,
  });
  const koulen = await loadGoogleFont({
    family: "Koulen",
    weight: 400,
  });
  const svg = await satori(node, {
    width: TicketWidth,
    height: TicketHeight,
    debug: env.APP_ENV === "localhost",
    fonts: [
      {
        name: "Koulen",
        data: koulen,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: inter,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: interBold,
        weight: 800,
        style: "bold",
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
};
