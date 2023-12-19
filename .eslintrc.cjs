module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js'],
  plugins: ['react', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'comma-dangle': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'arrow-body-style': 'off',
  },
};
