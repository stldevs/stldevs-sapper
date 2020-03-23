<style>
    section {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
        grid-gap: 1rem;
        margin: 1em;
    }
</style>

<script>
    import Dev from "./Dev.svelte";

    export let response;
</script>

<section>
    {#each response as dev}
        <Dev {dev}/>
    {/each}
</section>