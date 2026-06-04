import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['config.js', 'node_modules/'] },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'off',
    },
  },
];
