module.exports = {
  root: true,
  extends: [
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      { allow: ['error', 'warn'] }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // UNICORN
    'unicorn/prefer-module': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          setupDevToolsUI: true
        }
      }
    ]
  }
}
