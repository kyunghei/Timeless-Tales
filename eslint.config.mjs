// .eslintrc.js

export default {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      nextCustomizeStep: 'readonly', // Mark the function as globally accessible and not to be modified
      submitCustomization: 'readonly'
    }
  },
  rules: {
    eqeqeq: 'error',
    curly: 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: 'off',
    'no-unused-vars': ['warn'],
    indent: ['error', 2],
    'no-multi-spaces': 'error',
    'space-before-function-paren': ['error', 'never']
  },
  linterOptions: {
    reportUnusedDisableDirectives: true
  }
};