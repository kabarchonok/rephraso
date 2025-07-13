<script lang='ts'>
  import type { RandomPhrase } from '../stores/state'
  import State from '../components/State.svelte'
  import { getUrl } from '../stores/router'
  import { getRandomPhrase } from '../stores/state'

  const { categoryId }: { categoryId: string } = $props()
  let phrase = $state<RandomPhrase>()

  $effect(() => {
    updatePhrase()
  })

  function updatePhrase() {
    phrase = getRandomPhrase(categoryId)
  }
</script>

<div class='phrase'>
  {#if !phrase}
    <State emoji='(X_X)' title='Whops! There is some error'>
      {#snippet actions()}
        <a class='phrase__action' href={getUrl('home')}>return to categories</a>
      {/snippet}
    </State>
  {:else}
    <div class='phrase__category'>{phrase.categoryName}</div>
    <div class='phrase__container'>
      <div class='phrase__text'>{phrase.text}</div>

      <div class='phrase__actions'>
        <a class='phrase__action' onclick={updatePhrase} href={getUrl({
          route: 'phrase',
          params: { categoryId: phrase.categoryId },
        })}>rephraso!</a>
        <a class='phrase__action' href={getUrl('home')}>return to categories</a>
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
        color: oklch(0.85 0 0);
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
        color: oklch(0.55 0 0);
    }

</style>
