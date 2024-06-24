<script lang="ts">
  import { onMount } from "svelte";
  import { API_URL } from "../lib";
  import type { Movie } from "../types/Movie";
  import Spinner from "../lib/Spinner.svelte";

  let data: Movie | null = null;

  export let id: string = "";
  let loading = true;

  onMount(async () => {
    const response = await fetch(`${API_URL}/movies/${id}`);
    data = await response.json();
    loading = false;
  });
</script>

{#if loading}
  <p>
    <Spinner />
  </p>
{:else if data}
  <div class="flex flex-col items-center justify-center">
    <img src={data.image_full_url} class="w-1/4" alt={data.id} loading="lazy" />

    {#if data.cached}
      <p class="text-xs text-red-500">Cached</p>
    {/if}

    <h3 class="text-lg font-semibold mt-2">{data.title}</h3>
    <p class="text-sm mt-2">{data.overview}</p>
  </div>
{/if}
