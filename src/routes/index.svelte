<script>
	import Hero from "../components/Hero.svelte";
</script>
<style>

</style>

<svelte:head>
	<title>STL Devs</title>
</svelte:head>

<Hero/>

<article>
	<h3>Hello world!</h3>
	<p>
		This is a site for discovering what open source work developers are doing in the Greater St. Louis region by
		harvesting public information from Github.
	</p>
	<p>
		If a user on Github has self-identified as being from St. Louis, they are included here. To do this, add
		<code>St. Louis</code> to your location in your Github profile.
	</p>

	<h3>Did you know?</h3>
	<p>
		There are over 3,000 developers from St. Louis on Github that have pushed to over 6,000 code repositories.
	</p>
	<p>
		The creator of the sublime-text git plugin is from St. Louis. Another St. Louisan created a JavaScript CMS and
		yet another made a Dropbox-like sync tool in pure shell script!
	</p>
	<p>
		We have many talented and driven developers here and this site's goal is to show off our projects to the city
		and the rest of the world.
	</p>

	<h3>Contribute</h3>

	<p>
		Contributions are welcome to <a href="http://github.com/jakecoffman/stldevs">the API</a> or <a
			href="https://github.com/jakecoffman/stldevs-vue">the UI</a>! Filing issues is the easiest way to contribute.
	</p>
</article>
