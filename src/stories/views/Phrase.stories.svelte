<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Phrase from '../../views/Phrase.svelte'

  const { Story } = defineMeta({
    title: 'Views/Phrase',
    component: Phrase,
  })
</script>

<Story name='Base' />
