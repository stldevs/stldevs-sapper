<script context="module">
  export async function preload(page, session) {
    const r = await this.fetch('/stldevs-api/last-run');
    const lastRun = await r.json();
    if (!r.ok) {
      return this.error(r.status, lastRun)
    }
    session.lastRun = lastRun
  }
</script>

<script>
  export let segment;

  import Nav from '../components/Nav.svelte';
  import {stores} from '@sapper/app';
  import Spinner from "../components/Spinner.svelte";
  import Hero from "../components/Hero.svelte";

  const {preloading, page, session} = stores();
</script>

<style>
  main {
    background: #ececec;
    width: 100%;
    height: 100%;
  }
</style>

<Nav {segment}/>

<main>
  {#if $page.params && $page.params.slug}
  <Hero title={$page.params.slug}/>
  {/if}
  {#if $preloading}
    <Spinner/>
  {:else}
    <slot></slot>
  {/if}
</main>
