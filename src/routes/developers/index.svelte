<script context="module">
  export async function preload(page, session) {
    if (session.topdevs) {
      return {response: session.topdevs}
    }
    const r = await this.fetch('/stldevs-api/devs');
    const response = await r.json();
    session.topdevs = response;
    return {response};
  }
</script>

<script>
  export let response;

  import Listing from "../../components/Listing.svelte";
  import Hero from "../../components/Hero.svelte";
</script>

<svelte:head>
  <title>STL Devs | Developers</title>
</svelte:head>

<Hero title="Top Devs in St. Louis" lastrun="true"/>
<Listing response={response} route="developers"/>
