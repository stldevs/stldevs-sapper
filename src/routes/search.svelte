<script context="module">
    export async function preload(page, session) {
        let { q } = page.query;
        let users = [];
        let repos = [];

        if (!q) {
            return {};
        }

        if (session.search && session.search[q]) {
            return { users: session.search[q].users, repos: session.search[q].repos, q};
        }

        // Why 2 different queries? in the old site one query was much faster so
        // it showed results sooner. Here that is not the case yet since it's SSR.
        let url1 = `/stldevs-api/search?type=users&q=${encodeURIComponent(q)}`;
        const p = this.fetch(url1).then(async function(res){
            const response = await res.json();
            return response.results;
        });
        let url2 = `/stldevs-api/search?type=repos&q=${encodeURIComponent(q)}`;
        repos = await this.fetch(url2).then(async function(res) {
            const response = await res.json();
            return response.results;
        });
        users = await p;

        if (session.search) {
            session.search[q] = {users, repos}
        } else {
            session.search = {q: {users, repos} }
        }

        return { users, repos, q };
    }
</script>
<script>
    export let users = null;
    export let repos = null;
    export let q = '';

    import Hero from "../components/Hero.svelte";
    import {goto} from '@sapper/app';
    import Listing from "../components/Listing.svelte";

    async function search() {
        if (q === '') {
            await goto(`/search`);
            return
        }
        await goto(`/search?q=${encodeURIComponent(q)}`)
    }
</script>
<style>
    .search {
        margin: 1em;
        display: flex;
        justify-content: center;
    }
    input {
        font-size: 16pt;
    }
    h4 {
        margin: 0;
    }
    section {
        margin-bottom: 1em;
    }
</style>

<Hero title="Search St. Louis Devs"/>

<div class="search">
    <input id="search" type="text" bind:value={q} placeholder="Search" on:keyup={e=>e.key==='Enter' && search()}/>
    <button on:click={search}>
        Search
    </button>
</div>

{#if !users && !repos}
    <p class="center">Search for users or repositories</p>
{/if}

{#if users}
    <p class="center">{users.length} users</p>
    <Listing response={users}/>
{/if}

{#if repos}
<p class="center">{repos.length} repos</p>
<article class="repos">
    {#each repos as repo}
    <section>
        <div class="flex">
            <h4 class="flex-1">
                {repo.Name} (by <a href="/developers/{repo.Owner}">{repo.Owner}</a>)
            </h4>
            <span>{repo.StargazersCount} <icon name="star"></icon> {repo.ForksCount} <icon name="fork"></icon></span>
        </div>
        <em>{repo.Description}</em>
    </section>
    {/each}
</article>
{/if}
