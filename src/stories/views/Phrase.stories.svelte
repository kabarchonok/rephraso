<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import { fillState } from '../../stores/state'
  import Phrase from '../../views/Phrase.svelte'

  fillState()

  const { Story } = defineMeta({
    title: 'Views/Phrase',
    component: Phrase,
  })
</script>

<Story name='Base' args={{ categoryId: '1' }} />

<Story name='Error' args={{ categoryId: 'nonexistent' }} />
