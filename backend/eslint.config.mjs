// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginImport from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],
      'comma-dangle': ['error', 'only-multiline'],
      curly: ['error', 'multi-line', 'consistent'],
      eqeqeq: ['error', 'always'],
      'max-lines': ['error', { max: 500, skipBlankLines: true }],
      'max-lines-per-function': ['error', { skipBlankLines: true }],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-fallthrough': 'warn',
      'no-useless-return': 'error',
      'object-shorthand': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'never', next: 'if', prev: 'if' },
        {
          blankLine: 'always',
          next: ['block-like', 'const', 'export', 'let', 'return', 'throw'],
          prev: '*',
        },
        { blankLine: 'always', next: '*', prev: ['block-like', 'const', 'let'] },
        { blankLine: 'never', next: 'const', prev: 'const' },
        { blankLine: 'never', next: 'let', prev: 'let' },
        { blankLine: 'always', next: '*', prev: ['multiline-const', 'multiline-let'] },
      ],
      'prefer-const': 'error',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],

      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreDeclarationSort: true,
          memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
        },
      ],
      yoda: 'error',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
);
