const expoConfig = require('eslint-config-expo/flat');

module.exports = [
  ...expoConfig,
  {
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      'import/no-unresolved': 'off',
    },
  },
  {
    ignores: ["dist/*"],
  }
];
