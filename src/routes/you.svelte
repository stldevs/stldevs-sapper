<script>
    import Hero from "../components/Hero.svelte";

    let me

    fetch(`/stldevs-api/me`).then(r => r.json()).then(u => me = u).catch(e => {})

    async function logout() {
        await fetch(`/stldevs-api/logout`, {credentials: 'include'})
        location.reload()
    }
    async function optOut() {
        const r = await fetch(`/stldevs-api/devs/${me.login}`, {
            credentials: 'include',
            method: 'patch',
            body: JSON.stringify({Hide: true}),
        })
        me = await r.json().User
    }
    async function optIn() {
        const r = await fetch(`/stldevs-api/devs/${me.login}`, {
            credentials: 'include',
            method: 'patch',
            body: JSON.stringify({Hide: false})
        })
        me = await r.json().User
    }
</script>

<Hero title="You"/>

<article>
    {#if !me}
        <p>You aren't logged in.</p>

        <p>You can log in to opt-out of this website.</p>

        <a href="/stldevs-api/login">Log in with GitHub</a>
    {:else}
        Welcome {me.name || me.login}!
        {#if !me.Hide}
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

        {#if me.IsAdmin}
            <div>You're an admin</div>
        {/if}

        <button on:click={logout}>Logout</button>
    {/if}
</article>
