<script>
  import FaHome from 'svelte-icons/fa/FaHome.svelte'
  import FaCode from 'svelte-icons/fa/FaCode.svelte'
  import FaUsers from 'svelte-icons/fa/FaUsers.svelte'
  import FaSitemap from 'svelte-icons/fa/FaSitemap.svelte'
  import FaSearch from 'svelte-icons/fa/FaSearch.svelte'
  import FaSmile from 'svelte-icons/fa/FaSmile.svelte'

  export let segment;
</script>

<style>
  [aria-current] {
    font-weight: bold;
    background: #ececec;
  }

  @media screen and (max-width: 690px) {
    nav {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    h1, span {
      display: none;
    }
  }

  @media screen and (min-width: 691px) {
    nav {
      display: flex;
      flex-direction: column;
      border-right: 1px solid rgba(0, 0, 0, 0.14);
      height: 100%;
    }

    h1 {
      padding-left: 1em;
    }
  }

  #thing {
    font-variant-caps: all-small-caps;
  }

  nav {
    background-color: white;
  }

  a {
    padding: 1em;
    color: black;
    display: flex;
  }

  .icon {
    width: 16px;
    height: 16px;
    padding-right: 1em;
  }
</style>

<nav>
  <h1 id="thing">STL DEVS</h1>
  <a href="/" aria-current='{segment === undefined ? "page" : undefined}'>
    <div class="icon">
      <FaHome/>
    </div>
    <span>Home</span>
  </a>
  <a href="/languages" aria-current='{segment === "languages" ? "page" : undefined}' rel="prefetch">
    <div class="icon">
      <FaCode/>
    </div>
    <span>Languages</span>
  </a>
  <a href="/developers" aria-current='{segment === "developers" ? "page" : undefined}'>
    <div class="icon">
      <FaUsers/>
    </div>
    <span>Developers</span>
  </a>
  <a href="/organizations" aria-current='{segment === "organizations" ? "page" : undefined}'>
    <div class="icon">
      <FaSitemap/>
    </div>
    <span>Organizations</span>
  </a>
  <a href="/search" aria-current='{segment === "search" ? "page" : undefined}'>
    <div class="icon">
      <FaSearch/>
    </div>
    <span>Search</span>
  </a>
  <a href="/you" aria-current='{segment === "you" ? "page" : undefined}'>
    <div class="icon">
      <FaSmile/>
    </div>
    <span>You</span>
  </a>
</nav>
