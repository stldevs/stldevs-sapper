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
  import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte'
  import FaBook from 'svelte-icons/fa/FaBook.svelte'
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
    display: grid;
    grid-template-columns: 60px 1fr;
  }
  .inner {
    padding: .5em .5em .5em .75em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h3 {
    margin: 0 0 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    font-size: .90rem;
    color: #505050;
  }
  img {
    object-fit: cover;
    border-radius: 4px 4px 0 0;
    height: 100%;
  }
</style>

<Hero title="Top Languages in St. Louis" lastrun="true"/>

<section>
  {#each response.langs as {Language, Count, Users}}
  <div class="card">

    <a href="/languages/{encodeURIComponent(Language)}">
      <img src="/langs/{encodeURIComponent(Language)}.svg" alt="{Language} logo" onerror="this.src = '/langs/Unknown.svg';">
    </a>
    <div class="inner">
      <h3>
        <a href="/languages/{encodeURIComponent(Language)}">
          {Language}
        </a>
      </h3>
      <div class="flex">
        <span title="repositories" class="flex-1"><i><FaBook/></i> {Count}</span>
        <span title="users"><i><FaUserCircle/></i> {Users}</span>
      </div>
    </div>
  </div>
  {/each}
</section>
