import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import styledComponents from 'eslint-plugin-styled-components';
import styledComponentsA11y from 'eslint-plugin-styled-components-a11y';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      'styled-components': styledComponents,
      'styled-components-a11y': styledComponentsA11y,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'plugin:styled-components-a11y/recommended',
    ],
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error', // Prettier 오류를 ESLint 오류로 처리
      'styled-components-a11y/no-autofocus': 'warn', // Styled Components 접근성 규칙 추가
      'styled-components-a11y/anchor-is-valid': 'warn', // 링크 유효성 검사
      'styled-components/no-unused-styled-components': 'warn', // 사용되지 않은 styled component 경고
    },
  },
];
