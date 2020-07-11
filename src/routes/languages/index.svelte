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
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    grid-gap: .5rem;
    margin: .5rem;
  }
  .card {
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
    font-weight: normal;
    margin: 0 0 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  ul {
    display: flex;
    opacity: .6;
  }
  li {
    display: flex;
    font-size: .90rem;
  }
  span {
    margin-left: .25rem;
  }
</style>

<Hero title="Top Languages in St. Louis" lastrun="true"/>

<section>
  {#each response.langs as {Language, Count, Users}}
  <div class="card">

    <a href="/languages/{encodeURIComponent(Language)}">
      <img src="/langs/{encodeURIComponent(Language)}.svg" loading="lazy" alt="{Language} logo" onerror="this.src = '/langs/Unknown.svg'">
    </a>
    <div class="inner">
      <h3>
        <a href="/languages/{encodeURIComponent(Language)}">
          {Language}
        </a>
      </h3>
      <ul>
        <li title="repositories" class="flex-1">
          <i><FaBook/></i>
          <span>{Count.toLocaleString()}</span>
        </li>
        <li title="users">
          <i><FaUserCircle/></i>
          <span>{Users.toLocaleString()}</span>
        </li>
      </ul>
    </div>
  </div>
  {/each}
</section>
