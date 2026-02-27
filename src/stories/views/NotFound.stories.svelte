<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import NotFound from '../../views/NotFound.svelte'

  const { Story } = defineMeta({
    title: 'Views/NotFound',
    component: NotFound,
  })
</script>

<Story name='Base' />
