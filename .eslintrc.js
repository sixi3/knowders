module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    // Performance & Bundle Size Rules
    'no-console': 'warn', // Warn about console statements
    'no-debugger': 'error', // No debugger in production
    'no-unused-vars': 'error', // Remove unused variables
    'no-dead-code': 'off', // Let terser handle this
    
    // Code Quality Rules
    'prefer-const': 'error', // Use const when possible
    'no-var': 'error', // No var declarations
    'eqeqeq': 'error', // Strict equality
    'no-eval': 'error', // No eval() for security
    'no-implied-eval': 'error', // No implied eval
    
    // Style Rules (minimal)
    'indent': ['error', 2], // 2-space indentation
    'quotes': ['error', 'single'], // Single quotes
    'semi': ['error', 'always'], // Always use semicolons
    'comma-trailing': 'off', // Let prettier handle this
    
    // Performance-specific rules
    'no-loop-func': 'error', // No functions in loops
    'no-new-object': 'error', // Use {} instead of new Object()
    'no-new-array': 'error', // Use [] instead of new Array()
    'no-new-wrappers': 'error', // No new String(), Number(), Boolean()
    
    // Browser compatibility
    'no-restricted-globals': [
      'error',
      {
        name: 'event',
        message: 'Use local parameter instead.'
      }
    ],
    
    // Documentation requirements
    'valid-jsdoc': ['warn', {
      requireReturn: false,
      requireParamDescription: true,
      requireReturnDescription: false
    }]
  },
  
  // Globals for browser environment
  globals: {
    'window': 'readonly',
    'document': 'readonly',
    'navigator': 'readonly',
    'console': 'readonly'
  },
  
  // Override rules for test files
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      rules: {
        'no-console': 'off' // Allow console in tests
      }
    }
  ]
}; 