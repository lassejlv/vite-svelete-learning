<script lang="ts">
  import { Router, Route } from "svelte-routing";

  import Home from "./routes/index.svelte";
  import Movie from "./routes/movie.svelte";

  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/movie/:id" let:params>
      <Movie id={params.id} />
    </Route>
    <Route path="/"><Home /></Route>
  </div>
</Router>
