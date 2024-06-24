import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { movie } from "./routes/movies";

const app = new Hono();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN!, allowMethods: ["GET"] }));
if (process.env.NODE_ENV === "dev") app.use(logger());

app.basePath("/api").route("/movies", movie);

serve({
  port: Number(process.env.PORT) || 3000,
  fetch: app.fetch,
});

console.log(`Started server on http://localhost:${process.env.PORT || 3000}`);
