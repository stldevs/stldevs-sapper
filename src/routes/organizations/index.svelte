<script context="module">
  export async function preload(page, session) {
    if (session.toporgs) {
      return {response: session.toporgs}
    }
    const r = await this.fetch('/stldevs-api/orgs');
    const response = await r.json();
    session.toporgs = response;
    return {response};
  }
</script>

<script>
  export let response;

  import Listing from "../../components/Listing.svelte";
  import Hero from "../../components/Hero.svelte";
</script>

<svelte:head>
  <title>STL Devs | Organizations</title>
</svelte:head>

<Hero title="Top Orgs in St. Louis" lastrun="true"/>
<Listing response={response}/>
