<script>
  import {onMount} from 'svelte';

  const dev = process.env.NODE_ENV === 'development';

  let promise = new Promise(() => {});

  onMount(() => {
    promise = getData();
  });

  async function getData() {
    const r = await fetch('/stldevs-api/last-run');
    return await r.json();
  }
</script>

<style>
  em {
    float: right;
  }
</style>

<em>
{#await promise}
  Loading last run data...
{:then lastRun}
  Last run {lastRun.split('T')[0]}
{:catch e}
  {e.message}
{/await}
</em>
