<script context="module">
  export async function preload(page, session) {
    let { slug } = page.params;

    if (session.devs && session.devs[slug]) {
      return { response: session.devs[slug], slug};
    }

    let url = `/stldevs-api/orgs/${slug}`;
    const res = await this.fetch(url);
    const response = await res.json();

    if (!res.ok) {
      return this.error(res.status, response);
    }

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

<Profile {response} {slug} isOrg="{true}"/>
