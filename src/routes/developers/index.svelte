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

  import Hero from "../../components/Hero.svelte";
  import FaCodeBranch from 'svelte-icons/fa/FaCodeBranch.svelte'
  import FaStar from 'svelte-icons/fa/FaStar.svelte'
  import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte'
  import FaBook from 'svelte-icons/fa/FaBook.svelte'
</script>

<svelte:head>
  <title>STL Devs | Developers</title>
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
  img {
    object-fit: cover;
    width: 100%
  }
  ul {
    padding-left: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>

<Hero title="Top Devs in St. Louis" lastrun="true"/>

<section>
  {#each response as dev}
  <div class="card">
    <a href="/developers/{dev.Login}">
      <img src={dev.AvatarUrl} alt="{dev.Login}'s photo">
    </a>
    <div class="inner">
      <h3>
        <a href="/developers/{dev.Login}">
          {dev.Name || dev.Login}
        </a>
      </h3>
      <ul>
        <li title="stars">
          <i><FaStar/></i> {dev.Stars}
        </li>
        <li title="forks">
          <i><FaCodeBranch/></i> {dev.Forks}
        </li>
        <li title="followers">
          <i><FaUserCircle/></i> {dev.Followers}
        </li>
        <li title="repositories">
          <i><FaBook/></i> {dev.PublicRepos}
        </li>
      </ul>
    </div>
  </div>
  {/each}
</section>
