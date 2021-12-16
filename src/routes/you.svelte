<script>
    import Hero from "../components/Hero.svelte";
    import {stores} from '@sapper/app';
    const {session} = stores();

    let session_value = null
    session.subscribe(value => session_value = value)

    async function logout() {
        await fetch(`/stldevs-api/logout`, {credentials: 'include'})
        location.reload()
    }
    async function optOut() {
        const r = await fetch(`/stldevs-api/devs/${session_value.me.login}`, {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({Hide: true}),
        })
        if (!r.ok) {
            return alert(await r.text())
        }
        const profile = await r.json()
        session.set({me: profile.User})
    }
    async function optIn() {
        const r = await fetch(`/stldevs-api/devs/${session_value.me.login}`, {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({Hide: false})
        })
        if (!r.ok) {
            return alert(await r.text())
        }
        const profile = await r.json()
        session.set({me: profile.User})
    }
</script>

<Hero title="You"/>

<article>
    {#if !session_value.me}
        <p>You aren't logged in. You can log in to opt-out of this website.</p>

        <a class="button" href="/stldevs-api/login">Log in with GitHub</a>

        <p>
          If you'd rather not log in with GitHub, mention me on Twitter and I'll opt you out.
          <a href="https://twitter.com/nill" target="_blank">@nill</a>
        </p>
    {:else}
        Welcome {session_value.me.name || session_value.me.login}!
        {#if !session_value.me.Hide}
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

        {#if session_value.me.is_admin}
            <p>You're an admin</p>
        {/if}

        <p>
            <button on:click={logout}>Logout</button>
        </p>
    {/if}
</article>
