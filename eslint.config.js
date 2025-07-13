// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  svelte: true,

  rules: {
    'ts/consistent-type-definitions': 'off',
    'ts/no-empty-object-type': 'off',
  },
})
