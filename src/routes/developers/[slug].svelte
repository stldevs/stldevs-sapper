<script context="module">
  export async function preload(page, session) {
    let { slug } = page.params;

    if (session.devs && session.devs[slug]) {
      return { response: session.devs[slug], slug};
    }

    let url = `/stldevs-api/devs/${slug}`;
    const res = await this.fetch(url);
    const response = await res.json();

    if (!res.ok) {
      return this.error(res.status, response);
    }

    if (session.devs) {
      session.devs[slug] = response
    } else {
      session.devs = {slug: response}
    }

    return { response, slug };
  }
</script>

<style>
  h4 {
    margin: 0;
  }
  section {
    margin-bottom: .75rem;
  }
  li {
    margin-bottom: .5rem;
  }
</style>

<script>
  import FaStar from 'svelte-icons/fa/FaStar.svelte'
  import FaCodeBranch from 'svelte-icons/fa/FaCodeBranch.svelte'
  import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte'
  import FaBook from 'svelte-icons/fa/FaBook.svelte'
  import FaBookmark from 'svelte-icons/fa/FaBookmark.svelte'

  export let response;
  export let slug;
</script>

<svelte:head>
  <title>STL Devs | {slug}</title>
</svelte:head>

<article>
  <section class="profile">
    <img class="avatar" src={response.User.avatar_url} alt="{response.User.Login}'s photo">
    <ul>
<!--      <li v-if="me && me.IsAdmin">-->
<!--        User is <span v-if="response.User.Hide">hidden</span><span v-else>visible</span>.-->
<!--        <button @click="toggleHide(!response.User.Hide)">-->
<!--          Toggle-->
<!--        </button>-->
<!--      </li>-->
      <li><a href="https://github.com/{response.User.login}" target="_blank">
        {response.User.name || response.User.login} <icon name="external-link-alt" class="sup" scale="0.75"/>
      </a></li>
      <li>{response.User.blog || ''}</li>
      <li>{response.User.email || ''}</li>
      <li title="followers"><i><FaUserCircle/></i> {response.User.followers}</li>
      <li title="repositories"><i><FaBook/></i> {response.User.public_repos}</li>
      <li title="gists"><i><FaBookmark/></i> {response.User.public_gists}</li>
    </ul>
  </section>
  <section class="code">
    {#each Object.entries(response.Repos) as [lang, info] }
    <h3 id={lang}>{lang}</h3>
    {#each info as repo}
    <section class="repo">
      <div class="flex">
        <h4 class="flex-1">
          {#if repo.Fork === true}
          <i title="is a fork"><FaCodeBranch/></i>
          {/if}
          <a href="https://github.com/{slug}/{repo.Name}" target="_blank">{repo.Name}</a>
        </h4>
        <span>
            <i title="stars"><FaStar/></i>{repo.StargazersCount}
            <i title="forks"><FaCodeBranch/></i>{repo.ForksCount}
        </span>
      </div>
      <em>{repo.Description || ''}</em>
    </section>
    {/each}
    {/each}
  </section>
</article>

