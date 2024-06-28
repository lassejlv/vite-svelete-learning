<script lang="ts">
  import { type Movie } from "../types/Movie";
  const watchList = localStorage.getItem("watchlist");
  if (!watchList) {
    localStorage.setItem("watchlist", JSON.stringify([]));
  }

  let movies: Movie[] = JSON.parse(watchList!);
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-10 p-5">
  {#each movies as movie}
    <a href={`/movie/${movie.id}`} class="flex justify-center items-center">
      <img
        class="rounded-md w-1/2 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
        src={movie.image_full_url}
        alt={movie.original_title}
      />
    </a>
  {/each}
</div>
