import AppDecorator from './AppDecorator.svelte'

import '../src/app.css'

/** @type { import('@storybook/svelte-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [() => AppDecorator],
}

export default preview
