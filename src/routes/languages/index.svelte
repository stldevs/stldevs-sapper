<script context="module">
  export async function preload(page, session) {
    if (session.toplangs) {
      return {response: session.toplangs}
    }
    const r = await this.fetch('/stldevs-api/toplangs');
    const response = await r.json();
    session.toplangs = response;
    return {response};
  }
</script>

<script>
  export let response;

  import Hero from "../../components/Hero.svelte";
</script>

<svelte:head>
  <title>STL Devs | Languages</title>
</svelte:head>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
    grid-gap: 1rem;
    margin: 1em;
  }
  .card {
    background: white;
    width: 100%;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  }
  .inner {
    padding: .5em;
  }
  h3 {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    font-size: .90rem;
    color: #505050;
  }
</style>

<Hero title="Top Languages in St. Louis" lastrun="true"/>

<section>
  {#each response.langs as {Language, Count, Users}}
  <div class="card">
    <div class="inner">
      <h3>
        <a href="/languages/{Language}">
          {Language}
        </a>
      </h3>
      <div class="flex nowrap">
        <span class="flex-1">Repos: {Count}</span>
        <span>Users: {Users}</span>
      </div>
    </div>
  </div>
  {/each}
</section>
