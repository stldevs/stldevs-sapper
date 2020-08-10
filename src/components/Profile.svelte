<style>
  h4 {
    margin: 0;
  }

  section {
    margin-bottom: .75rem;
  }

  header {
    display: grid;
    grid-template-columns: 1fr 5rem 5rem;
  }

  .profile {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .user-info {
    display: grid;
    grid-template-rows: auto auto auto 1fr;
  }

  li {
    margin-bottom: .5rem;
  }

  .stats {
    display: flex;
  }

  .stats li {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-right: 1rem;
    color: #5d5d5d;
  }

  @media (max-width: 690px) {
    .profile {
      display: flex;
    }

    .avatar {
      margin-bottom: 1rem;
    }
  }

  .admin {
    margin: 1rem;
    border: 1px solid red;
    background: #fc8383;
    border-radius: 5px;
    padding: 1rem;
  }
  .admin h3 {
    margin: 0;
    padding: 0;
  }
</style>

<script>
  import FaStar from 'svelte-icons/fa/FaStar.svelte'
  import FaCodeBranch from 'svelte-icons/fa/FaCodeBranch.svelte'
  import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte'
  import FaBook from 'svelte-icons/fa/FaBook.svelte'
  import FaBookmark from 'svelte-icons/fa/FaBookmark.svelte'

  import {stores} from '@sapper/app';

  const {session} = stores();
  let session_value = null
  session.subscribe(value => session_value = value)

  export let response;
  export let slug;
  export let isOrg = false;

  function toggleHide(login, val) {
    fetch(`/stldevs-api/devs/${login}`, {
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({Hide: val}),
    })
    .then(async r => {
      if (r.ok) {
        response = await r.json()
      }
    })
  }

  function delUser(login) {
    fetch(`/stldevs-api/devs/${login}`, {
      credentials: 'include',
      method: 'DELETE'
    }).then(() => {
      location.reload()
    })
  }
</script>

<article>
  <section>
    <div class="profile">
      <img class="avatar" src={response.User.avatar_url} loading="lazy" alt="{response.User.Login}'s photo">
      <ul class="user-info">
        <li><a href="https://github.com/{response.User.login}" target="_blank">
                {response.User.name || response.User.login}
              <!--                    <i class="sup"><FaExternalLinkSquareAlt/></i>-->
        </a></li>
        <li>
            {#if response.User.blog}
              <a href={response.User.blog.startsWith('http') ? response.User.blog : `http://${response.User.blog}` }
                 target="_blank">
                  {response.User.blog}
              </a>
            {/if}
        </li>
      <li>
          {#if response.User.email}
            <a href={`mailto:${response.User.email}`}>{response.User.email}</a>
          {/if}
        <li class="bio">{response.User.bio || ''}</li>
        <li>
          <ul class="stats">
              {#if !isOrg}
                <li title="followers"><i>
                  <FaUserCircle/>
                </i>{response.User.followers.toLocaleString()}</li>
                <li title="gists"><i>
                  <FaBookmark/>
                </i>{response.User.public_gists.toLocaleString()}</li>
              {/if}
            <li title="repositories"><i>
              <FaBook/>
            </i>{response.User.public_repos.toLocaleString()}</li>
            <li title="total stars"><i>
              <FaStar/>
            </i>{response.User.stars ? response.User.stars.toLocaleString() : 0}</li>
            <li title="total forks"><i>
              <FaCodeBranch/>
            </i>{response.User.forks ? response.User.forks.toLocaleString() : 0}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
  {#if session_value.me && session_value.me.is_admin}
    <aside class="admin">
      <h3>Admin</h3>
      {#if response.User.hide}
        User is hidden
      {:else}
        User is visible
      {/if}
      <button on:click={toggleHide(response.User.login, !response.User.hide)}>
        Toggle Visibility
      </button>
      <button on:click={delUser(response.User.login)}>
        Delete User
      </button>
    </aside>
  {/if}
  <section class="code">
      {#each Object.entries(response.Repos) as [lang, info] }
        <h3 id={lang}>{lang}</h3>
          {#each info as repo}
            <section class="repo">
              <header>
                <h4>
                    {#if repo.Fork === true}
                      <i title="is a fork">
                        <FaCodeBranch/>
                      </i>
                    {/if}
                  <a href="https://github.com/{slug}/{repo.Name}" target="_blank">{repo.Name}</a>
                </h4>
                <span><i title="stars"><FaStar/></i>{repo.StargazersCount.toLocaleString()}</span>
                <span><i title="forks"><FaCodeBranch/></i>{repo.ForksCount.toLocaleString()}</span>
              </header>
              <em>{repo.Description || ''}</em>
            </section>
          {/each}
      {/each}
  </section>
</article>
