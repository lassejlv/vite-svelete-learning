import "dotenv/config";
import type { Movie, MovieProps } from "../types/Movie";

const API_KEY = process.env.THEMOVIEDB_KEY;
const API_URL = "https://api.themoviedb.org/3";

async function FetchMovies({ multiple }: MovieProps): Promise<Movie[] | Movie | null> {
  const pageNumber = Math.floor(Math.random() * 500) + 1;

  const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`);
  if (!response.ok) return null;

  const movies: Movie[] = [];
  // prettier-ignore
  const data = await response.json() as { results: Movie[] };

  // Format the data and push it to the movies array
  for (let movie of data.results) {
    movies.push({
      id: movie.id,
      adult: movie.adult,
      backdrop_path: movie.backdrop_path,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      image_full_url: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    });
  }

  if (multiple) return movies;
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  return randomMovie;
}

async function FetchById(id: string): Promise<Movie | null> {
  const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  if (!response.ok) return null;

  const data = await response.json();
  const movie: Movie = {
    id: data.id,
    adult: data.adult,
    backdrop_path: data.backdrop_path,
    original_language: data.original_language,
    original_title: data.original_title,
    overview: data.overview,
    popularity: data.popularity,
    poster_path: data.poster_path,
    release_date: data.release_date,
    title: data.title,
    image_full_url: `https://image.tmdb.org/t/p/original${data.poster_path}`,
  };

  return movie;
}

export { FetchMovies, FetchById };
