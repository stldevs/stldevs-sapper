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
  @media screen and (max-width: 690px) {
    #thing {
      display: none;
    }

    #lil-logo {
      z-index: 10;
      position: absolute;
      top: 0;
      left: 0;
      padding: 0;
      margin: 0;
    }

    #lil-logo > a {
      padding: 0;
    }

    nav {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    span {
      display: none;
    }
  }

  @media screen and (min-width: 691px) {
    #lil-logo {
      display: none;
    }

    nav {
      display: flex;
      flex-direction: column;
      border-right: 1px solid rgba(0, 0, 0, 0.14);
      height: 100%;
    }

    i {
      padding-right: 1em;
    }
  }

  nav {
    background-color: #0B1B3F;
    color: #ffffff;
  }

  [aria-current] {
    font-weight: bold;
    background: #000080;
  }

  a {
    padding: 1em;
    color: #dddddd;
    display: flex;
  }
</style>

<div id="lil-logo">
  <a href="/">
      <img src="/stldevs.jpeg" alt="stldevs logo" style="object-fit: cover" height="50" width="50"/>
  </a>
</div>

<nav>
  <img id="thing" src="/stldevs.jpeg" alt="stldevs logo" style="object-fit: cover"/>

  <a href="/" aria-current='{segment === undefined ? "page" : undefined}' rel="prefetch" title="home">
    <i><FaHome/></i>
    <span>Home</span>
  </a>
  <a href="/languages" aria-current='{segment === "languages" ? "page" : undefined}' rel="prefetch" title="languages">
    <i><FaCode/></i>
    <span>Languages</span>
  </a>
  <a href="/developers" aria-current='{segment === "developers" ? "page" : undefined}' rel="prefetch" title="developers">
    <i><FaUsers/></i>
    <span>Developers</span>
  </a>
  <a href="/organizations" aria-current='{segment === "organizations" ? "page" : undefined}' rel="prefetch" title="organizations">
    <i><FaSitemap/></i>
    <span>Organizations</span>
  </a>
  <a href="/search" aria-current='{segment === "search" ? "page" : undefined}' rel="prefetch" title="search">
    <i><FaSearch/></i>
    <span>Search</span>
  </a>
  <a href="/you" aria-current='{segment === "you" ? "page" : undefined}' rel="prefetch" title="you">
    <i><FaSmile/></i>
    <span>You</span>
  </a>
</nav>
