<script lang="ts">
  import { Router, Route } from "svelte-routing";

  import Home from "./routes/index.svelte";
  import Movie from "./routes/movie.svelte";
  import { Toaster } from "svelte-french-toast";
  import Navbar from "./lib/Navbar.svelte";
  import Watchlist from "./routes/watchlist.svelte";
  import Test from "./routes/test.svelte";

  export let url = "";
</script>

<Router {url}>
  <Navbar />

  <Toaster position="bottom-center" />

  <div>
    <Route path="/test"><Test /></Route>
    <Route path="/watchlist"><Watchlist /></Route>
    <Route path="/movie/:id" let:params>
      <Movie id={params.id} />
    </Route>
    <Route path="/"><Home /></Route>
  </div>
</Router>
