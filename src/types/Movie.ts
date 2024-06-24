type Movie = {
  id: string;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  image_full_url: string;
  cached?: boolean;
};

export type { Movie };
