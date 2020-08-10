<style>
  .card {
    display: flex;
    flex-direction: column;
  }

  .inner {
    padding: .5em;
  }

  h3 {
    font-weight: normal;
    margin: 0 0 .5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    object-fit: cover;
    width: 100%
  }

  ul {
    margin: 0;
    padding-left: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: .5rem;
    text-align: center;
    color: #5d5d5d;
    font-size: .85rem;
  }

  ul.three-wide {
    grid-template-columns: 1fr 1fr 1fr;
  }

  li {
    display: flex;
  }

  span {
    margin-left: .25rem;
  }
</style>

<script>
  export let dev;
  export let route;

  $: r = route ? route : dev.type === 'User' ? 'developers' : 'organizations';

  import FaCodeBranch from 'svelte-icons/fa/FaCodeBranch.svelte'
  import FaStar from 'svelte-icons/fa/FaStar.svelte'
  import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte'
  import FaBook from 'svelte-icons/fa/FaBook.svelte'
</script>

<div class="card">
  <a href="/{r}/{dev.login}" rel="prefetch">
    <img src={dev.avatar_url || dev.avatar_url} loading="lazy" alt="{dev.login}'s photo">
  </a>
  <div class="inner">
    <h3>
      <a href="/{r}/{dev.login}" rel="prefetch">
          {dev.name || dev.login}
      </a>
    </h3>
    <ul class={dev.type !== 'User' ? 'three-wide' : ''}>
        {#if dev.stars !== undefined}
          <li title="stars">
            <i>
              <FaStar/>
            </i>
            <span>{dev.stars.toLocaleString()}</span>
          </li>
        {/if}
        {#if dev.forks !== undefined}
          <li title="forks">
            <i>
              <FaCodeBranch/>
            </i>
            <span>{dev.forks.toLocaleString()}</span>
          </li>
        {/if}
        {#if dev.type === 'User'}
          <li title="followers">
            <i>
              <FaUserCircle/>
            </i>
            <span>{dev.followers.toLocaleString()}</span>
          </li>
        {/if}
      <li title="repositories">
        <i>
          <FaBook/>
        </i>
        <span>{dev.public_repos.toLocaleString()}</span>
      </li>
    </ul>
  </div>
</div>
