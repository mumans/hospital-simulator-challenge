module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/__tests__/**'],
      env: {
        jest: true
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended']
    }
  ]
};
