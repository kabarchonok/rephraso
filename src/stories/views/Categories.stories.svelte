<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Categories from '../../views/Categories.svelte'

  const { Story } = defineMeta({
    title: 'Views/Categories',
    component: Categories,
  })

  const categories = [
    { id: '1', name: 'Question' },
    { id: '2', name: 'Suggestion' },
    { id: '3', name: 'Clarify' },
  ]
</script>

<Story name='Base' args={{ categories }} />

<Story name='Empty' args={{ categories: [] }} />
