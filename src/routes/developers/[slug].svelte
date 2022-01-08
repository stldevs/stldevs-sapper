<script context="module">
  export async function preload(page, session) {
    let { slug } = page.params;

    if (session.devs && session.devs[slug]) {
      return { response: session.devs[slug], slug};
    }

    let url = `/stldevs-api/devs/${slug}`;
    const res = await this.fetch(url);

    if (!res.ok) {
      return this.error(res.status, await res.json());
    }

    const response = await res.json()

    if (session.devs) {
      session.devs[slug] = response
    } else {
      session.devs = {slug: response}
    }

    return { response, slug };
  }
</script>

<script>
  import Profile from "../../components/Profile.svelte";
  export let response;
  export let slug;
</script>

<svelte:head>
  <title>STL Devs | {slug}</title>
</svelte:head>

<Profile bind:response={response} {slug}/>
