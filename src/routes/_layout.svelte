<script>
  export let segment;

  import Nav from '../components/Nav.svelte';
  import Spinner from "../components/Spinner.svelte";
  import Hero from "../components/Hero.svelte";
  import {stores} from '@sapper/app';

  const {preloading, page} = stores();
</script>

<style>
  main {
    background: #ececec;
    width: 100%;
    height: 100%;
  }
  div {
    width: 200px;
    height: 200px;
    margin: auto;
  }
</style>

<Nav {segment}/>

<main>
  {#if $page.params && $page.params.slug}
  <Hero title={$page.params.slug}/>
  {/if}
  {#if $preloading}
    <div><Spinner/></div>
  {:else}
    <slot></slot>
  {/if}
</main>
