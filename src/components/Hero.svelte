<style>
  header {
    display: flex;
    justify-content: center;

    color: white;
    background: url('/keyboard.jpg');
    background-size: cover;
  }
</style>

<script>
  export let title;
</script>

<header class="header">
  <h2>{ title || 'St. Louis Developers' }</h2>
</header>
