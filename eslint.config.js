import antfu from '@antfu/eslint-config'

// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
export default antfu({
  formatters: true,
  svelte: true,

  stylistic: {
    semi: false,
    quotes: 'single',
  },
  rules: {
    'ts/consistent-type-definitions': 'off',
    'ts/no-empty-object-type': 'off',
  },
})
