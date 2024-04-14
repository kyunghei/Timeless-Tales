import globals from 'globals'

import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended })

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    rules: { // Add your custom rules here
      eqeqeq: 'error',
      curly: 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: 'off',
      'no-unused-vars': ['warn'],
      indent: ['error', 2],
      'no-multi-spaces': 'error',
      'space-before-function-paren': ['error', 'never']
    }
  },
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('standard')
]
