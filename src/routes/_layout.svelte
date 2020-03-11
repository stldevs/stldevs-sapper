<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
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
	<slot></slot>
</main>
