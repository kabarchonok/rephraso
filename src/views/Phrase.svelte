<script lang='ts'>
  import type { RandomPhrase } from '../stores/state'
  import Action from '../components/Action.svelte'
  import State from '../components/State.svelte'
  import { getUrl } from '../stores/router'
  import { getRandomPhrase } from '../stores/state'

  const { categoryId }: { categoryId: string } = $props()
  let phrase = $state<RandomPhrase>()

  $effect(() => {
    updatePhrase()
  })

  function updatePhrase() {
    try {
      phrase = getRandomPhrase(categoryId)
    }
    catch {
      phrase = undefined
    }
  }
</script>

<div class='phrase'>
  {#if !phrase}
    <State emoji='(X_X)' title='Whops! There is some error'>
      {#snippet actions()}
        <Action class='phrase__action' href={getUrl('home')}>return to categories</Action>
      {/snippet}
    </State>
  {:else}
    <div class='phrase__category'>{phrase.categoryName}</div>
    <div class='phrase__container'>
      <div class='phrase__text'>{phrase.text}</div>

      <div class='phrase__actions'>
        <Action class='phrase__action' onclick={updatePhrase} href={getUrl({
          route: 'phrase',
          params: { categoryId: phrase.categoryId },
        })}>rephraso!</Action>
        <Action class='phrase__action' href={getUrl('home')}>return to categories</Action>
      </div>
    </div>
  {/if}
</div>

<style>
    .phrase {
        display: flex;
        flex-direction: column;
        align-items: center;

        height: 100%;

        text-align: center;
    }

    .phrase__category {
        font-size: 16px;
        color: var(--color-text-muted);
    }

    .phrase__text {
        max-width: 320px;
        font-size: 26px;
        font-weight: 600;
    }

    .phrase__container {
        display: flex;
        flex-direction: column;
        gap: 32px;
        align-items: center;
        justify-content: center;

        height: 100%;
    }

    .phrase__actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        color: var(--color-text-secondary);
    }
</style>
