<script context="module">
  export async function preload(page, session) {
    let { slug } = page.params;
    let { p } = page.query;

    p = Number(p || 0);

    if (session.langs && session.langs[slug + p]) {
      return { response: session.langs[slug+p], slug, p};
    }

    let url = `/stldevs-api/lang/${encodeURIComponent(slug)}`;
    if (p) {
      url += `?offset=${p*25}&limit=25`
    }
    const res = await this.fetch(url);
    const response = await res.json();

    if (!res.ok) {
      return this.error(res.status, response);
    }

    if (session.langs) {
      session.langs[slug + p] = response
    } else {
      const key = slug + p;
      session.langs = {key: response}
    }

    return { response, slug, p };
  }
</script>

<style>
  .page-of {
    text-align: right;
    padding: 0;
    margin: 0;
  }
  ul {
    margin-left: 1rem;
    margin-bottom: .75rem;
    padding-bottom: .75rem;
    border-bottom: 1px solid #c9c9c9;
  }
  li {
    margin-top: .5rem;
  }
</style>

<script>
  import FaStar from 'svelte-icons/fa/FaStar.svelte'
  import { goto } from '@sapper/app';

  export let response;
  export let slug;
  export let p;

  let page = p ? p : 0;
  const pageSize = 25;
  let offset = page * pageSize;

  $: pages = Math.ceil(response.count / pageSize);
  $: morePages = page+1 < pages;

  async function next() {
    page++;
    document.getElementsByTagName('header')[0].scrollIntoView({behavior: 'smooth'});
    await goto(`/languages/${encodeURIComponent(slug)}?p=${page}`)
  }

  async function prev() {
    page--;
    document.getElementsByTagName('header')[0].scrollIntoView({behavior: 'smooth'});
    await goto(`/languages/${encodeURIComponent(slug)}?p=${page}`)
  }
</script>

<svelte:head>
  <title>STL Devs | {slug}</title>
</svelte:head>

<article>
  <h3 ref="top">{response.count.toLocaleString()} {slug} users in St. Louis</h3>
  <p class="page-of">Page {page} of {pages}</p>
  {#each response.languages as lang}
  <div>
    <a href="/developers/{lang.Owner}">{lang.Owner}</a> has <b>{lang.Count.toLocaleString()}</b> <i><FaStar/></i> from {slug} repos:
    <ul>
      {#each lang.Repos as r}
      <li>
        <a href="https://github.com/{lang.Owner}/{r.Name}" target="_blank">
          {r.Name}
        </a>
        (<b>{r.StargazersCount.toLocaleString()}</b> <i><FaStar/></i>)
        <small>{r.Description || '(No description)'}</small>
      </li>
      {/each}
    </ul>
  </div>
  {/each}
  <div class="flex">
    <div>
      <button class="flex-1" on:click={prev} disabled={page === 0}>
        Previous
      </button>
    </div>
    <div class="flex-1 center">Page {page} of {pages}</div>
    <div>
      <button on:click={next} disabled={!morePages}>
        Next
      </button>
    </div>
  </div>
</article>
