import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '**/dist/**',
      'packages/*/dist/**',
      'build/**',
      '**/build/**',
      '*.min.js',
      '**/*.js',
      '!.eslintrc.js',
      '!eslint.config.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // 通用规则
      'no-console': 'off',
      'no-debugger': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // 格式化规则
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'as-needed'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'max-len': ['error', { code: 100 }],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'comma-spacing': ['error', { before: false, after: true }],
    },
  },
  // common 包特定规则
  {
    files: ['packages/common/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  // API 包特定规则
  {
    files: ['packages/api/**/*.ts'],
    rules: {
      // API 包特定规则
    },
  },
  // todo-http 包特定规则
  {
    files: ['packages/todo-http/**/*.ts'],
    rules: {
      // todo-http 包特定规则
    },
  },
  // todo-web 包特定规则
  {
    files: ['packages/todo-web/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  // 应用 Prettier 配置（放在最后以覆盖冲突的规则）
  prettierConfig,
);
