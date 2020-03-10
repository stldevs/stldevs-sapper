<script>
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

  span {
    padding: 1em;
  }

  a {
    padding: 1em;
    color: black;
  }
</style>

<nav>
  <h1 id="thing">STL DEVS</h1>
  <a href="/" aria-current='{segment === undefined ? "page" : undefined}'>
    <!--		<icon name="home"></icon>-->
    <span>Home</span>
  </a>
  <a href="/languages" aria-current='{segment === "languages" ? "page" : undefined}' rel="prefetch">
    <!--		<icon name="code"></icon>-->
    <span>Languages</span>
  </a>
  <a href="/developers" aria-current='{segment === "developers" ? "page" : undefined}'>
    <!--		<icon name="users"></icon>-->
    <span>Developers</span>
  </a>
  <a href="/organizations" aria-current='{segment === "organizations" ? "page" : undefined}'>
    <!--		<icon name="sitemap"></icon>-->
    <span>Organizations</span>
  </a>
  <a href="/search" aria-current='{segment === "search" ? "page" : undefined}'>
    <!--		<icon name="search"></icon>-->
    <span>Search</span>
  </a>
  <a href="/you" aria-current='{segment === "you" ? "page" : undefined}'>
    <!--		<icon name="smile"></icon>-->
    <span>You</span>
  </a>
</nav>
