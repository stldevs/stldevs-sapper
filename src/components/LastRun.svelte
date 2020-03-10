<script>
  import {onMount} from 'svelte';

  const dev = process.env.NODE_ENV === 'development';

  let promise = new Promise(() => {});

  onMount(() => {
    promise = getData();
  });

  async function getData() {
    let url = 'https://stldevs.com/stldevs-api/last-run';
    if (dev) {
      url = 'http://localhost:8283/stldevs-api/last-run';
    }
    const r = await fetch(url);
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
