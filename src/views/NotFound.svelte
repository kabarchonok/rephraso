<script lang='ts'>
  import Action from '../components/Action.svelte'
  import State from '../components/State.svelte'
  import { getUrl } from '../stores/router'
</script>

<div class='not-found'>
  <State emoji='(·_·)?' title='Page not found'>
    {#snippet actions()}
      <Action class='not-found__action' href={getUrl('home')}>return to categories</Action>
    {/snippet}
  </State>
</div>

<style>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;

    text-align: center;
  }
</style>
