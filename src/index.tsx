import { cors } from "hono/cors";
import { Hono } from "hono";
import { createImage } from "./Image";
import React from "react";
import { Ticket } from "./Ticket";
import { Env } from "./sharedTypes";

const app = new Hono();

const getApiInformation = async (URL: string, ticketId: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "text/javascript");
  const url = `${URL}/${ticketId}`;
  console.log("Fetching API data", url);
  const rawResponse = await fetch(url, {
    headers,
  });
  console.log("parsing API result");
  const response = (await rawResponse.json()) as {
    userId: string;
    username: string;
    ticketId: string;
    userPhoto: string | null;
    name: string | null;
  };

  return response;
};

const decodeImage = (img: Uint8Array) => {
  console.log("decoding image");
  const response = String.fromCharCode(...new Uint8Array(img));
  console.log("image is decoded");
  return response;
};

const encodeImage = (decoded: string) => {
  console.log("encoding image back");
  const response = Uint8Array.from(
    [...decoded].map((ch) => ch.charCodeAt(0))
  ).buffer;
  console.log("image is encoded");
  return response;
};

const defaultImageHeaders = new Headers();
defaultImageHeaders.append("Cache-Control", "max-age=604800");
defaultImageHeaders.append("Content-Type", "image/png");
defaultImageHeaders.append("Content-Disposition", "inline");
defaultImageHeaders.append("Strict-Transport-Security", "max-age=31536000");

app.get("/ticket/image/:ticketId", cors(), async (c) => {
  try {
    const env = c.env as Env;
    const ticketsKV = env.TICKETS_QR_IMAGES as KVNamespace;
    const ticketId = c.req.param("ticketId");
    if (!ticketId) {
      throw new Error("no ticket");
    }
    console.log("checking if the image is stored");
    const { value: storedImage } = await ticketsKV.getWithMetadata<{
      length: string;
    }>(ticketId);
    const parsedHeaders = Object.fromEntries(defaultImageHeaders.entries());
    if (storedImage) {
      console.log("image cache found");
      const encoded = encodeImage(storedImage);
      console.log("returning");
      return c.body(encoded, 200, parsedHeaders);
    } else {
      console.log("image cache not found");
    }
    const response = await getApiInformation(env.API_URL, ticketId);
    // Hit our API
    console.log('URL', env.API_URL)
    console.log("creating image with API data", JSON.stringify(response));
    const ticketName =
      response.ticketType === 'meetup'
        ? response.ticketName
        : response.ticketType === 'workshop'
          ? 'Workshop'
          : 'JSConf Chile'
    const ticketType = response.ticketType === 'meetup' || response.ticketType === 'workshop'
      ? response.ticketType
      : 'jsconf'
    const img = await createImage(
      <Ticket
        ticketName={ticketName}
        ticketType={ticketType}
        ticketDescription={response.ticketDescription}
        ticketId={response.ticketId}
        username={response.username}
        fullName={response.name}
        imageUrl={response.userPhoto}
      />,
      env
    );
    const decoded = decodeImage(img);
    console.log("Storing in cache");
    await ticketsKV.put(ticketId, decoded, {
      expirationTtl: env.TTL_EN_SEGUNDOS,
    });
    console.log("Stored in cache");

    console.log("Returning");
    return c.body(img, 200, parsedHeaders);
  } catch (e) {
    console.error(e);
    return c.json({ error: true }, 500);
  }
});

export default app;
