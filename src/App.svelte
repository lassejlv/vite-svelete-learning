<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";

  import Home from "./routes/index.svelte";
  import About from "./routes/about.svelte";

  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/about"><About /></Route>
    <Route path="/"><Home /></Route>
  </div>
</Router>
