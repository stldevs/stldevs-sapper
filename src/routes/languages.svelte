<script context="module">
  const dev = process.env.NODE_ENV === 'development';

  export async function preload(page, session) {
    const r = await this.fetch('/stldevs-api/toplangs');
    const response = await r.json();
    return {response};
  }
</script>

<script>
  import Hero from "../components/Hero.svelte";
  import LastRun from "../components/LastRun.svelte";

  export let response;
</script>

<svelte:head>
  <title>STL Devs | Languages</title>
</svelte:head>

<Hero title="Languages"/>

<article>
  <LastRun/>
  <table>
    <thead>
    <tr>
      <th>Language</th>
      <th>Repos</th>
      <th>Users</th>
    </tr>
    </thead>
    <tbody>
    {#each response.langs as {Language, Count, Users}}
      <tr>
        <td>
          <a href="/languages/{Language}">
              {Language}
          </a>
        </td>
        <td>{Count}</td>
        <td>{Users}</td>
      </tr>
    {/each}
    </tbody>
  </table>
</article>
