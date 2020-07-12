<script>
    import Hero from "../components/Hero.svelte";
    import {stores} from '@sapper/app';
    const {session} = stores();

    async function logout() {
        await fetch(`/stldevs-api/logout`, {credentials: 'include'})
        location.reload()
    }
    async function optOut() {
        const r = await fetch(`/stldevs-api/devs/${session.me.login}`, {
            credentials: 'include',
            method: 'patch',
            body: JSON.stringify({Hide: true}),
        })
        session.me = await r.json().User
    }
    async function optIn() {
        const r = await fetch(`/stldevs-api/devs/${session.me.login}`, {
            credentials: 'include',
            method: 'patch',
            body: JSON.stringify({Hide: false})
        })
        session.me = await r.json().User
    }
</script>

<Hero title="You"/>

<article>
    {#if !session.me}
        <p>You aren't logged in.</p>

        <p>You can log in to opt-out of this website.</p>

        <a href="/stldevs-api/login">Log in with GitHub</a>
    {:else}
        Welcome {session.me.name || session.me.login}!
        {#if !session.me.Hide}
            <div>
                <p>To opt out of stldevs click here:</p>
                <button on:click={optOut}>Opt Out</button>
            </div>
        {:else}
            <div>
                <p>You should be hidden now.</p>
                <p>To opt back in to stldevs click here:</p>
                <button on:click={optIn}>Opt In</button>
            </div>
        {/if}

        {#if session.me.is_admin}
            <div>You're an admin</div>
        {/if}

        <button on:click={logout}>Logout</button>
    {/if}
</article>
