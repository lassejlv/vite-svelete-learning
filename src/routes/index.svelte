<script lang="ts">
  import { API_URL } from "../lib";
  import type { Movie } from "../types/Movie";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import Spinner from "../lib/Spinner.svelte";
  import { PlusCircle, Trash } from "lucide-svelte";

  function maxLength(str: string, max: number) {
    return str.length > max ? str.slice(0, max) + "..." : str;
  }

  let loading = true;
  let movies: Movie[] = [];
  let viewFullImage = false;
  let showFullText = false;

  const addToWatchList = (movie: Movie) => {
    // Remove movie from array
    removeMovieFromArray(movie.id);

    // Add to localStorage
    const moviesLocal = localStorage.getItem("watchlist");
    const watchlist = moviesLocal ? JSON.parse(moviesLocal) : [];
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    toast.success("Movie added to watchlist");
  };

  const removeMovieFromArray = (id: string) => {
    movies = movies.filter((movie) => movie.id !== id);

    if (movies.length === 0) {
      loading = true;
      fetchMovies();
    }
  };

  const getNextMovieInArray = () => {
    if (movies.length === 0) {
      toast.error("No more movies to show");
      return null;
    }

    const nextMovie = movies[0];
    removeMovieFromArray(nextMovie.id);
    return nextMovie;
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${API_URL}/movies/random`);
      const data = await response.json();
      movies = data;
      loading = false;
    } catch (error) {
      console.error("Failed to fetch movies", error);
      toast.error("Failed to fetch movies");
    }
  };

  onMount(async () => {
    await fetchMovies();
  });
</script>

<main>
  {#if loading}
    <Spinner />
  {:else}
    <div class="flex flex-col md:flex-row justify-between gap-10 m-20">
      <img
        src={movies[0].image_full_url}
        alt={movies[0].title}
        on:click={() => (viewFullImage = !viewFullImage)}
        class="w-1/2 md:w-1/4 max-w-[25%] rounded-md cursor-pointer bg-transparent border-none p-0"
      />

      <div class="flex flex-col">
        <h1 class="text-3xl font-bold">
          {movies[0].original_title}
        </h1>
        <p class="whitespace-pre-line mt-5 text-gray-300">
          {#if !showFullText}
            {maxLength(movies[0].overview, 200)}
          {:else}
            {movies[0].overview}
          {/if}

          {#if movies[0].overview.length > 200}
            <button class="text-blue-500" on:click={() => (showFullText = !showFullText)}>
              {showFullText ? "Show less" : "Show more"}
            </button>
          {/if}
        </p>

        <div class="flex gap-5 mt-5">
          <button class="btn btn-neutral btn-md" on:click={() => getNextMovieInArray()}> <Trash /> Nahh, trash it </button>
          <button class="btn btn-primary btn-md" on:click={() => addToWatchList(movies[0])}>
            <PlusCircle />
            Add to watchlist
          </button>
        </div>
      </div>
    </div>
  {/if}
</main>

{#if viewFullImage}
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    on:click={() => (viewFullImage = false)}
  >
    <img src={movies[0].image_full_url} alt={movies[0].title} class="w-1/4" />
  </div>
{/if}
