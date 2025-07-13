<script lang='ts'>
  import type { Category } from '../stores/state'
  import State from '../components/State.svelte'
  import { getUrl } from '../stores/router'
  import { fillState } from '../stores/state'

  const { categories = [] }: { categories: Category[] } = $props()
</script>

<div class='categories'>
  {#if !categories.length}
    <State emoji='¯\_(ツ)_/¯' title="Seems you haven't any categories">
      {#snippet actions()}
        <button class='not-found__action-link' onclick={fillState}>create new ones</button>
      {/snippet}
    </State>
  {:else}
    <ul class='categories__list list'>
      {#each categories as category}
        <li class='list__item'>
          <a class='list__item-link' href={getUrl({
            route: 'phrase',
            params: { categoryId: category.id },
          })}>{category.name}</a>
        </li>
      {/each}
    </ul>

    <div class='actions'>
      <a class='actions__link' href={getUrl('edit')}>edit categories</a>
    </div>
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

  .list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;

    height: 100%;

    font-size: 32px;
    font-weight: 500;
    line-height: 36px;
  }

  .actions {
    margin: auto 0 0 0;
  }

  .actions__link {
    color: oklch(0.75 0 0);
  }

  .not-found__action-link {
    text-decoration: none;
  }
</style>
