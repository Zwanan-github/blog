import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('prettier'),
  {
    rules: {
      // 强制使用分号
      semi: ['error', 'always'],
      // 强制使用 2 个空格缩进
      indent: ['error', 2],
      // 强制使用单引号
      quotes: ['error', 'single'],
      // 强制在对象和数组字面量中使用尾随逗号
      'comma-dangle': ['error', 'always-multiline'],
      // 强制在 if、while、for 等语句中使用大括号
      curly: ['error', 'all'],
      // 强制操作符周围有空格
      'space-infix-ops': 'error',
      // 强制在函数参数和调用中使用空格
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      // 强制在对象字面量的属性中使用空格
      'object-curly-spacing': ['error', 'always'],
      // 强制在数组字面量中使用空格
      'array-bracket-spacing': ['error', 'never'],
      // 强制在 JSX 属性中使用空格
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never',
        },
      ],
      // 禁止未使用的变量
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];

export default eslintConfig;
