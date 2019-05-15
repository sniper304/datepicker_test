module.exports = {
    env: {
      browser: true,
      es6: true
    },
    extends: 'airbnb-base',
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2015,
      sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'comma-dangle': [2, 'never'],
      'no-param-reassign': ['error', { props: false }],
      'arrow-parens': [2, 'as-needed'],
      strict: [2, 'never'],
      'react/jsx-uses-react': 2,
      'react/jsx-uses-vars': 2,
      'react/react-in-jsx-scope': 2
    }
  }
  