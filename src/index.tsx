import { cors } from "hono/cors";
import { Hono } from "hono";
import { createImage } from "./Image";
import React from "react";
import { Ticket } from "./Ticket";
import { Env } from "./sharedTypes";

const app = new Hono();

app.get("/ticket/image/:ticketId", cors(), async (c) => {
  try {
    const env = c.env as Env;
    const ticketsKV = env.TICKETS_QR_IMAGES as KVNamespace;
    const ticketId = c.req.param("ticketId");
    if (!ticketId) {
      throw new Error("no ticket");
    }

    c.header("Cache-Control", "max-age=604800");
    c.header("Content-Type", "image/png");

    console.log("checking if the image is stored");
    const storedImage = await ticketsKV.getWithMetadata(ticketId);
    console.log("Image metadata", storedImage.metadata);
    if (storedImage.value) {
      console.log("Image is indeed stored");
      return c.body(storedImage.value);
    }
    console.log("Image is not stored");

    // Hit our API
    const headers = new Headers();
    headers.append("Content-Type", "text/javascript");
    const url = `${env.API_URL}/${ticketId}`;
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
    console.log("creating image", { response });
    const img = await createImage(
      <Ticket
        ticketId={response.ticketId}
        username={response.username}
        fullName={response.name}
        imageUrl={response.userPhoto}
      />,
      env
    );
    console.log("Image created");
    await ticketsKV.put(ticketId, img, { expirationTtl: env.TTL_EN_SEGUNDOS });

    return c.body(img);
  } catch (e) {
    console.error(e);
    return c.json({ error: true }, 500);
  }
});

export default app;
