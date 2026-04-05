<script lang='ts'>
  import type { Snippet } from 'svelte'

  const { emoji, title, actions }: { emoji: string, title: string, actions: Snippet } = $props()
</script>

<div class='state'>
  <div class='state__content'>
    <div class='state__emoji'>{emoji}</div>
    <div class='state__title'>{title}</div>
  </div>

  <div class='state__actions'>
    {@render actions()}
  </div>
</div>

<style>
  .state {
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;

    height: 100%;
  }

  .state__content {
    margin-top: auto;
  }

  .state__emoji {
    font-size: 48px;
  }

  .state__title {
    font-size: 32px;
  }

  .state__actions {
    margin-top: auto;
  }
</style>
