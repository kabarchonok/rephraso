<script lang='ts'>
  import type { RandomPhrase } from '../stores/state'
  import Action from '../components/Action.svelte'
  import State from '../components/State.svelte'
  import * as speech from '../lib/speech'
  import { getUrl } from '../stores/router'
  import { getRandomPhrase } from '../stores/state'

  const { categoryId }: { categoryId: string } = $props()
  let phrase = $state<RandomPhrase>()
  let speaking = $state(false)

  $effect(() => {
    try {
      phrase = getRandomPhrase(categoryId)
    }
    catch {
      phrase = undefined
    }
  })

  function refreshPhrase() {
    speech.cancel()
    speaking = false
    try {
      phrase = getRandomPhrase(categoryId, phrase?.phraseIndex)
    }
    catch {
      phrase = undefined
    }
  }

  function listen() {
    if (!phrase)
      return

    if (speaking) {
      speech.cancel()
      speaking = false
      return
    }

    speech.speak(phrase.text, {
      onStart: () => speaking = true,
      onEnd: () => speaking = false,
      onError: () => speaking = false,
    })
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
      <Action class='phrase__listen' onclick={listen}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
          <path d='M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z' />
          <path d='M16 9a5 5 0 0 1 0 6' />
          <path d='M19.364 18.364a9 9 0 0 0 0-12.728' />
        </svg>
      </Action>
      <div class='phrase__context'>{phrase.context}</div>
    </div>

    <div class='phrase__actions'>
      <Action class='phrase__action phrase__action_primary' onclick={refreshPhrase}>rephraso!</Action>
      <Action class='phrase__action' href={getUrl('home')}>return to categories</Action>
    </div>
  {/if}
</div>

<style>
    .phrase {
        display: flex;
        flex-direction: column;
        align-items: center;

      /*max-width: 340px;*/
      height: 100%;
      margin: 0 auto;

        text-align: center;
    }

    .phrase__category {
        font-size: 16px;
    }

    .phrase__text {
        font-size: 30px;
        font-weight: 500;
      line-height: 36px;
    }

    .phrase :global(.phrase__listen) {
      position: relative;

      width: 22px;
      height: 22px;
      margin-top: 16px;

      color: var(--color-text-secondary);
    }

    .phrase :global(.phrase__listen::before) {
      content: '';
      position: absolute;
      inset: 0;
      margin: -10px;
    }

    .phrase__context {
      margin-top: 24px;
      font-size: 16px;
      color: var(--color-text-secondary);
    }

    .phrase :global(.phrase__listen) {
      position: relative;

      width: 22px;
      height: 22px;
      margin-top: 16px;

      color: var(--color-text-secondary);
    }

    .phrase :global(.phrase__listen::before) {
      content: '';
      position: absolute;
      inset: 0;
      margin: -10px;
    }

    .phrase__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 100%;
    }

    .phrase__actions {
        display: flex;
        flex-direction: column;
        gap: 24px;
        align-items: center;
    }

    .phrase :global(.phrase__action_primary) {
      border-bottom: 1px solid currentColor;
      font-size: 20px;
    }
</style>
