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
            session.langs = {q: {users, repos} }
        }

        return { users, repos, q };
    }
</script>
<script>
    export let users = null;
    export let repos = null;
    export let q = '';

    import Hero from "../components/Hero.svelte";
    import { goto } from '@sapper/app';

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
    .center {
        display: flex;
        justify-content: center;
    }
    .profile {
        padding-top: .5em;
        display: flex;
        align-items: center;
    }
    .deets {
        flex-grow: 1;
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

{#if users && repos}
<div>
    <p class="center">{users.length} users and {repos.length} repos</p>
    <article>
        <h3>Users</h3>
        <section>
            {#each users as user}
            <div class="profile">
                <a href="/developers/{user.Login}">
                    <img class="avatar" src={user.AvatarURL} alt="{user.Login}'s photo">
                </a>
                <ul class="deets">
                    <li><a href="/developers/{user.Login}">{user.Name || user.Login}</a></li>
                    <li>{user.Blog}</li>
                    <li>{user.Email}</li>
                    <li>{user.Followers} followers</li>
                    <li>{user.PublicRepos} repos</li>
                    <li>{user.PublicGists} gists</li>
                </ul>
            </div>
            {/each}
        </section>
    </article>
    <article class="repos" v-if="repos.results.length">
        <h3>Repositories</h3>
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
</div>
{:else}
    <p class="center">Search for users or repositories</p>
{/if}
