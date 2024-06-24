<script lang="ts">
  import { Link } from "svelte-routing";
  import { API_URL } from "../lib";
  import type { Movie } from "../types/Movie";
  import { onMount } from "svelte";
  let loading = true;
  let movies: Movie[] = [];

  onMount(async () => {
    const response = await fetch(`${API_URL}/movies/random`);
    const data = await response.json();
    movies = data;
    loading = false;
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <div class="flex flex-col items-center justify-center">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each movies as movie}
        <div class="flex flex-col items-center justify-center cursor-pointer">
          <img src={movie.image_full_url} class="w-1/4" alt={movie.id} loading="lazy" />
          <h3 class="text-lg font-semibold mt-2">{movie.title}</h3>
          <button class="bg-zinc-800 p-4 text-white rounded-md">
            <Link to={`/movie/${movie.id}`}>View Details</Link>
          </button>
        </div>
      {/each}
    </div>
  </div>
{/if}
