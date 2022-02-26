module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['@arcblock/eslint-config'],
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
    jest: true,
  },
  globals: {
    logger: true,
  },
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/require-default-props': 'off',
  },
  plugins: ['@typescript-eslint'],
};
