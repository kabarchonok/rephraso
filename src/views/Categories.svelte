<script lang='ts'>
  import type { Category } from '../stores/state'
  import Action from '../components/Action.svelte'
  import State from '../components/State.svelte'
  import { getUrl } from '../stores/router'
  import { fillState } from '../stores/state'

  const { categories = [] }: { categories: Category[] } = $props()
</script>

<div class='categories'>
  {#if !categories.length}
    <State emoji='¯\_(ツ)_/¯' title="Seems you haven't any categories">
      {#snippet actions()}
        <Action class='not-found__action-link' onclick={() => fillState()}>create new ones</Action>
      {/snippet}
    </State>
  {:else}
    <div class='header'>
      <h1 class='header__title'>rephraso</h1>
      <p class='header__subtitle'>expand your vocabulary</p>
    </div>

    <ul class='categories__list list'>
      {#each categories as category}
        <li class='list__item'>
          <Action class='list__item-link' href={getUrl({
            route: 'phrase',
            params: { categoryId: category.id },
          })}>
            <span class='list__item-name'>{category.name}</span>
            <span class='list__item-label'>{category.label}</span>
          </Action>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .categories {
    display: flex;
    flex-direction: column;
    gap: 48px;
    justify-content: center;

    box-sizing: border-box;
    height: 100%;
    padding: 8px 10px;

    text-align: center;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }

  .header__title {
    position: relative;

    margin: 0;

    font-size: 34px;
    font-weight: 700;
    line-height: 40px;
  }

  .header__title::before {
    --logo-size: 24px;

    content: '';

    position: absolute;
    bottom: 4px;
    left: calc(-8px - var(--logo-size));

    display: block;

    width: var(--logo-size);
    height: var(--logo-size);

    background-image: url('/favicon/favicon-96x96.png');
    background-size: contain;
  }

  .header__subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--color-text-secondary);
  }

  .list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  :global(.list__item-link) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 60px;
    border-top: 1px solid transparent;
  }

  .list__item + .list__item :global(.list__item-link) {
    border-top-color: var(--color-border);
  }

  .list__item-name {
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
  }

  .list__item-label {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--color-text-secondary);
  }
</style>
