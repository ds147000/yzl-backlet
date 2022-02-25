module.exports = {
  parser: 'babel-eslint',
  extends: ['@arcblock/eslint-config', 'plugin:react/jsx-runtime'],
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
  },
};
