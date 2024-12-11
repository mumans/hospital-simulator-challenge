import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import vue from 'eslint-plugin-vue';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  js.configs.recommended,
  ...compat.extends('plugin:vue/vue3-recommended', '@vue/eslint-config-typescript'),
  {
    files: ['src/**/*.{js,ts,vue}'],
    ignores: ['dist/**', 'node_modules/**'],
    plugins: {
      vue
    },
    rules: vue.configs.recommended.rules,
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    }
  }
];
