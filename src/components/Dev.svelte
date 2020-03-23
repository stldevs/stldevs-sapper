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
        margin: .5rem 0 0 1.5rem;
        padding-left: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: .5rem;
        text-align: center;
        opacity: .6;
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

    const route = dev.Type === 'User' ? 'developers' : 'organizations';

    import FaCodeBranch from 'svelte-icons/fa/FaCodeBranch.svelte'
    import FaStar from 'svelte-icons/fa/FaStar.svelte'
    import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte'
    import FaBook from 'svelte-icons/fa/FaBook.svelte'
</script>

<div class="card">
    <a href="/{route}/{dev.Login}">
        <img src={dev.AvatarURL || dev.AvatarUrl} alt="{dev.Login}'s photo">
    </a>
    <div class="inner">
        <h3>
            <a href="/{route}/{dev.Login}">
                {dev.Name || dev.Login}
            </a>
        </h3>
        <ul class={route === 'organizations' ? 'three-wide' : ''}>
            {#if dev.Stars !== undefined}
            <li title="stars">
                <i><FaStar/></i>
                <span>{dev.Stars}</span>
            </li>
            {/if}
            {#if dev.Forks !== undefined}
            <li title="forks">
                <i><FaCodeBranch/></i>
                <span>{dev.Forks}</span>
            </li>
            {/if}
            {#if route === 'developers'}
                <li title="followers">
                    <i><FaUserCircle/></i>
                    <span>{dev.Followers}</span>
                </li>
            {/if}
            <li title="repositories">
                <i><FaBook/></i>
                <span>{dev.PublicRepos}</span>
            </li>
        </ul>
    </div>
</div>