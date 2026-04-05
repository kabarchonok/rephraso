<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import { fillState } from '../../stores/state'
  import Phrase from '../../views/Phrase.svelte'

  fillState([
    { id: 'short', name: 'Agree', label: 'Express agreement', phrases: [{ text: 'Exactly.', context: 'Exactly — that\u2019s what I\u2019ve been trying to say all along.' }] },
    { id: 'normal', name: 'Clarify', label: 'Ask for more detail', phrases: [{ text: 'Could you say that again?', context: 'Could you say that again? I missed the part about the deadline.' }] },
    { id: 'long', name: 'Agree', label: 'Express agreement', phrases: [{ text: 'You took the words right out of my mouth.', context: 'You took the words right out of my mouth — that\u2019s exactly the problem.' }] },
  ])

  const { Story } = defineMeta({
    title: 'Views/Phrase',
    component: Phrase,
  })
</script>

<Story name='Short phrase' args={{ categoryId: 'short' }} />

<Story name='Normal phrase' args={{ categoryId: 'normal' }} />

<Story name='Long phrase' args={{ categoryId: 'long' }} />

<Story name='Error' args={{ categoryId: 'nonexistent' }} />
