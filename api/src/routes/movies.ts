import { Hono } from "hono";
import { FetchById, FetchMovies } from "../utils/movie";
import redis from "../utils/redis";

export const movie = new Hono();

movie.get("/random", async (c) => {
  try {
    // Rate limiter
    const userIp = c.req.raw.headers.get("X-Forwarded-For");
    console.log(userIp);

    const movies = await FetchMovies({ multiple: true });

    if (!movies) throw new Error("No movies found");
    else return c.json(movies);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

movie.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    // Check if the movie is cached
    const cachedMovie = await redis.get(`movie:${id}`);
    if (cachedMovie) return c.json({ ...JSON.parse(cachedMovie), cached: true });

    // Fetch the movie
    const movie = await FetchById(c.req.param("id"));
    if (!movie) throw new Error("Movie not found");

    // Cache the movie
    await redis.set(`movie:${id}`, JSON.stringify(movie), "EX", 60 * 60 * 24); // 24 hours

    return c.json({ ...movie, cached: false });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});
