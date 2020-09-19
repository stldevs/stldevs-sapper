<style>
  .profile {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  li {
      margin-bottom: 1rem;
      line-height: 1.1;
  }

  .stats {
    display: flex;
    flex-wrap: wrap;
  }

  .stats li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 1rem;
    color: #5d5d5d;
  }

  .stats i {
      margin-right: 3px;
  }

  .avatar {
      height: 200px;
      border-radius: 5px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      transition: all 0.6s cubic-bezier(.25,.8,.25,1);
      margin: 0 1rem 1rem;
  }
  .avatar:hover {
      box-shadow: 0 6px 12px rgba(0,0,0,0.22), 0 6px 12px rgba(0,0,0,0.26);
  }
  @media screen and (max-width: 690px) {
      .profile {
          flex-direction: column;
          align-items: center;
      }
      .avatar {
          width: 200px;
      }
  }
  .user-info {
      overflow-wrap: anywhere;
  }

  aside {
      margin-bottom: 1.5rem;
  }
  .admin {
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
  import FaCheckSquare from 'svelte-icons/fa/FaRegCheckSquare.svelte'
  import FaSquare from 'svelte-icons/fa/FaRegSquare.svelte'

  import {stores} from '@sapper/app';
  import Repos from "./Repos.svelte";

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

  let hideUnstarred = true
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

  <aside class="flex gap">
    <button on:click={() => hideUnstarred = !hideUnstarred} class="flex gap align-center">
      {#if hideUnstarred}
        <i><FaCheckSquare/></i>
      {:else}
        <i><FaSquare/></i>
      {/if}
      <span>Hide 0<i><FaStar/></i> 0<i><FaCodeBranch/></i></span>
    </button>
  </aside>

  <section class="code">
      {#each Object.entries(response.Repos) as [lang, repos] }
        <Repos {slug} {lang} {repos} {hideUnstarred}/>
      {/each}
  </section>
</article>
