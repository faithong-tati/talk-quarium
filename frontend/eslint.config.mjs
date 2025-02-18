import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import tsParser from '@typescript-eslint/parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Extend Next.js core configs
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Global config for all JS/TS files
  {
    languageOptions: {
      parser: tsParser, // Use the actual parser module
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'react-refresh': require('eslint-plugin-react-refresh'),
      react: require('eslint-plugin-react'),
      sonarjs: require('eslint-plugin-sonarjs'),
      'sort-class-members': require('eslint-plugin-sort-class-members'),
      'unused-imports': require('eslint-plugin-unused-imports'),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {},
  },

  // Config for TS and TSX files with additional rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser, // Use the imported parser here as well
      parserOptions: {
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/ban-types': 'off',
      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      'sort-class-members/sort-class-members': [
        'error',
        {
          order: [
            '[static-properties]',
            '[static-methods]',
            '[conventional-private-properties]',
            '[private-properties]',
            '[properties]',
            '[abstract-methods]',
            'constructor',
            '[conventional-private-methods]',
            '[private-methods]',
            '[methods]',
          ],
          groups: {
            'private-properties': [{ type: 'property', accessibility: 'private' }],
            'private-methods': [{ type: 'method', accessibility: 'private' }],
            'abstract-methods': [{ type: 'method', abstract: true }],
          },
          accessorPairPositioning: 'getThenSet',
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'off',
            properties: 'off',
          },
        },
      ],
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
      'import/order': [
        'error',
        {
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never',
          pathGroups: [
            {
              group: 'external',
              pattern: '@nestjs/**',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['nestjs'],
        },
      ],
      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],
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
        {
          blankLine: 'always',
          next: '*',
          prev: ['block-like', 'const', 'let'],
        },
        { blankLine: 'never', next: 'const', prev: 'const' },
        { blankLine: 'never', next: 'let', prev: 'let' },
        {
          blankLine: 'always',
          next: '*',
          prev: ['multiline-const', 'multiline-let'],
        },
      ],
      'prefer-const': 'error',
      quotes: [
        'error',
        'single',
        { allowTemplateLiterals: true },
      ],
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreDeclarationSort: true,
          memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      yoda: 'error',
    },
  },

  // Additional config for TS files only
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-unresolved': ['error', { ignore: ['@/'] }],
    },
  },
];
