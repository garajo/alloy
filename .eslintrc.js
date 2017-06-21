module.exports = {
  // Support ES2016 features
  parser: 'babel-eslint',
  extends: 'standard',
  rules: {
    'arrow-parens': [2, 'as-needed'],
    'eqeqeq': 0,
    'no-return-assign': 0, // fails for arrow functions
    'no-var': 2,
    'semi': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'yoda': 0,
    'arrow-spacing': 2,
    'dot-location': [2, 'property'],
    'prefer-arrow-callback': 2,
    'no-process-env': 0,
    'no-trailing-spaces': [2]
  },
  'plugins': [
    'json'
  ]
};