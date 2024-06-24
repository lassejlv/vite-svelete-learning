import { Hono } from "hono";
import { FetchMovies } from "src/utils/movie";

export const movie = new Hono();

movie.get("/random", async (c) => {
  try {
    const movies = await FetchMovies({ multiple: true });

    if (!movies) throw new Error("No movies found");
    else return c.json(movies);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});
