<style>
    section {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
        grid-gap: 1rem;
        margin: 1em;
    }
    .card {
        background: white;
        width: 100%;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        transition: all 0.6s cubic-bezier(.25,.8,.25,1);
    }
    .card:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    .inner {
        padding: .5em;
    }
    h3 {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    img {
        object-fit: cover;
        width: 100%
    }
    ul {
        margin: .5rem 0 0;
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
</style>

<script>
    export let response;
    export let route;

    import FaCodeBranch from 'svelte-icons/fa/FaCodeBranch.svelte'
    import FaStar from 'svelte-icons/fa/FaStar.svelte'
    import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte'
    import FaBook from 'svelte-icons/fa/FaBook.svelte'
</script>

<section>
    {#each response as dev}
        <div class="card">
            <a href="/{route}/{dev.Login}">
                <img src={dev.AvatarUrl} alt="{dev.Login}'s photo">
            </a>
            <div class="inner">
                <h3>
                    <a href="/{route}/{dev.Login}">
                        {dev.Name || dev.Login}
                    </a>
                </h3>
                <ul class={route === 'organizations' ? 'three-wide' : ''}>
                    <li title="stars">
                        <i><FaStar/></i> {dev.Stars}
                    </li>
                    <li title="forks">
                        <i><FaCodeBranch/></i> {dev.Forks}
                    </li>
                    {#if route === 'developers'}
                    <li title="followers">
                        <i><FaUserCircle/></i> {dev.Followers}
                    </li>
                    {/if}
                    <li title="repositories">
                        <i><FaBook/></i> {dev.PublicRepos}
                    </li>
                </ul>
            </div>
        </div>
    {/each}
</section>