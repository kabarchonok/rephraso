/** @type { import('@storybook/svelte-vite').StorybookConfig } */
const config = {
  stories: ['../**/*.stories.@(js|ts|svelte)'],
  addons: [
    '@storybook/addon-svelte-csf',
    '@chromatic-com/storybook',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/svelte-vite',
    options: {},
  },
}
export default config
