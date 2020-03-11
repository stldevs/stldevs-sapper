<script>
  import { stores } from '@sapper/app';
  const { session } = stores();
</script>

<style>
  em {
    position: absolute;
    right: 1em;
    top: -1.5rem;
  }
</style>

<em>
  Last run {$session.lastRun.split('T')[0]}
</em>
