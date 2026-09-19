import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'api', 'server.js', 'google-apps-script.js']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      // Allow intentionally-unused args/vars when prefixed with _.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // Keep console noise out of the shipped bundle, but warn/error are how
      // the error boundary and failed submissions report themselves.
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    // Vendored shadcn/ui primitives. They intentionally co-export cva variant
    // helpers alongside components, which trips the fast-refresh rule; we keep
    // them close to upstream so they stay easy to update.
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
