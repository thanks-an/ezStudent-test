/**
 * ESLint configuration for ES5 compliance
 * Based on Airbnb ES5 Style Guide
 */

'use strict'

module.exports = {
  env: {
    browser: true,
    node: true, // Enable Node.js environment for module.exports
    es6: false, // Disable ES6 features
  },

  parserOptions: {
    ecmaVersion: 5, // ES5 only
    sourceType: 'module', // Allow imports for Vue/Vite
  },

  rules: {
    // Variables
    'no-var': 'off', // Allow var (required for ES5)
    'prefer-const': 'off', // Disable const preference
    'prefer-let': 'off', // Disable let preference

    // Functions
    'prefer-arrow-callback': 'off', // No arrow functions in ES5
    'func-style': ['error', 'expression'], // Use function expressions

    // Strings
    quotes: ['error', 'single'], // Single quotes
    'quote-props': ['error', 'as-needed'], // Quote object properties as needed

    // Semicolons
    semi: ['error', 'always'], // Always use semicolons

    // Spacing
    indent: ['error', 2], // 2 space indentation
    'space-before-function-paren': ['error', 'never'], // No space before function parens
    'space-before-blocks': ['error', 'always'], // Space before blocks

    // Commas
    'comma-style': ['error', 'last'], // No leading commas
    'comma-dangle': ['error', 'never'], // No trailing commas (IE8 compat)

    // Comparison
    eqeqeq: ['error', 'always'], // Use === and !==

    // Objects/Arrays
    'dot-notation': ['error'], // Use dot notation when possible
    'no-array-constructor': 'error', // Use [] instead of new Array()
    'no-new-object': 'error', // Use {} instead of new Object()

    // Comments
    'spaced-comment': ['error', 'always'], // Space after comment markers

    // Naming
    camelcase: ['error', { properties: 'always' }], // Use camelCase
    'new-cap': ['error'], // Constructor functions should be capitalized

    // Blocks
    'brace-style': ['error', '1tbs', { allowSingleLine: true }], // Brace style
    curly: ['error', 'multi-line'], // Require braces for multi-line blocks

    // Whitespace
    'no-trailing-spaces': 'error', // No trailing spaces
    'eol-last': 'error', // End files with newline
    'no-multiple-empty-lines': ['error', { max: 2 }], // Limit empty lines

    // Hoisting
    'vars-on-top': 'error', // Declare variables at top of scope
    'no-use-before-define': ['error', { functions: false }], // No hoisting issues
  },
}
