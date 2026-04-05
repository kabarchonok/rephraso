<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Categories from '../../views/Categories.svelte'

  const { Story } = defineMeta({
    title: 'Views/Categories',
    component: Categories,
  })

  const categories = [
    { id: '1', name: 'Clarify', label: 'Ask for more detail' },
    { id: '2', name: 'Agree', label: 'Express agreement' },
    { id: '3', name: 'Disagree', label: 'Express disagreement' },
    { id: '4', name: 'Stall', label: 'Buy yourself time' },
    { id: '5', name: 'Ask', label: 'Ask a question' },
  ]
</script>

<Story name='Base' args={{ categories }} />

<Story name='Empty' args={{ categories: [] }} />
