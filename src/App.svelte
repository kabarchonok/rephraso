<script lang='ts'>
  import { logger } from '@nanostores/logger'
  import { router } from './stores/router'

  import { category, state } from './stores/state'

  import Categories from './views/Categories.svelte'
  import NotFound from './views/NotFound.svelte'
  import Phrase from './views/Phrase.svelte'

  logger({
    router,
    state,
    category,
  })
</script>

{#if !$router}
  <NotFound />
{:else if $router.route === 'home'}
  <Categories categories={$state.categories} />
{:else if $router.route === 'phrase'}
  <Phrase categoryId={$router.params.categoryId} />
{/if}
