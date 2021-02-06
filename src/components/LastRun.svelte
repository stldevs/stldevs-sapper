<script>
  import {stores} from '@sapper/app';
  import {onMount} from "svelte";
  import Spinner from "./Spinner.svelte";

  const {session} = stores();

  onMount(() => {
    if ($session.lastRun) {
      return
    }
    fetch('/stldevs-api/runs').then(async r => {
      const lastRun = await r.json();
      if (!r.ok) {
        return
      }
      $session.lastRun = lastRun.split('T')[0]
    })
  })
</script>

<style>
  em {
    position: absolute;
    right: 1em;
    top: -1.5rem;
  }
</style>

<em>
  Last run
  {#if $session.lastRun}
    {$session.lastRun}
  {:else}
    <i><Spinner color="white"/></i>
  {/if}
</em>
