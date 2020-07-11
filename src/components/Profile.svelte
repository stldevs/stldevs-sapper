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
    margin: 0 auto;
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
    justify-content: space-between;
    align-items: center;
    margin-right: 1rem;
  }
</style>

<script>
  export let response;
  export let slug;
  export let isOrg = false;

  import FaStar from 'svelte-icons/fa/FaStar.svelte'
  import FaCodeBranch from 'svelte-icons/fa/FaCodeBranch.svelte'
  import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte'
  import FaBook from 'svelte-icons/fa/FaBook.svelte'
  import FaBookmark from 'svelte-icons/fa/FaBookmark.svelte'
  import FaExternalLinkSquareAlt from 'svelte-icons/fa/FaExternalLinkSquareAlt.svelte'
</script>

<article>
  <section>
    <div class="profile">
      <img class="avatar" src={response.User.avatar_url} loading="lazy" alt="{response.User.Login}'s photo">
      <ul class="user-info">
        <!--      <li v-if="me && me.IsAdmin">-->
        <!--        User is <span v-if="response.User.Hide">hidden</span><span v-else>visible</span>.-->
        <!--        <button @click="toggleHide(!response.User.Hide)">-->
        <!--          Toggle-->
        <!--        </button>-->
        <!--      </li>-->
        <li><a href="https://github.com/{response.User.login}" target="_blank">
                {response.User.name || response.User.login}
              <!--                    <i class="sup"><FaExternalLinkSquareAlt/></i>-->
        </a></li>
        <li>
            {#if response.User.blog}
              <a href={response.User.blog} target="_blank">{response.User.blog}</a>
            {/if}
        </li>
        <li>
          {#if response.User.email}
            <a href={`mailto:${response.User.email}`}>{response.User.email}</a>
          {/if}
        <li><em>{response.User.bio || ''}</em></li>
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
            </i>{response.User.stars.toLocaleString()}</li>
            <li title="total forks"><i>
              <FaCodeBranch/>
            </i>{response.User.forks.toLocaleString()}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
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
