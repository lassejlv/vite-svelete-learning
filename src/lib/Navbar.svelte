<script>
  import { GithubIcon, Tv } from "lucide-svelte";
  import { GITHUB } from ".";
</script>

<div class="navbar bg-base-200">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl">Movie Swiper</a>
  </div>
  <div class="flex-none">
    <div class="dropdown dropdown-left">
      <div tabindex="0" role="button" class="btn m-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          ></path>
        </svg>
      </div>
      <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li><a href="/watchlist"><Tv /> Watchlist</a></li>
        <li><a href={GITHUB}><GithubIcon /> Github</a></li>
      </ul>
    </div>
  </div>
</div>
