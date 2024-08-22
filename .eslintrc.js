module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['./tsconfig.json', './client-node/tsconfig.json', './server/tsconfig.json'],
      tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb-typescript',
    ],
    rules: {
      '@typescript-eslint/ban-ts-ignore': 'off',
       '@typescript-eslint/no-explicit-any': 'warn',
       '@typescript-eslint/ban-ts-comment': 'off',
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parserOptions: {
          project: ['./tsconfig.json'],
        },
      },
      {
        files: ['client-node/**/*.ts', 'client-node/**/*.tsx'],
        parserOptions: {
          project: ['./client-node/tsconfig.json'],
        },
      },
      {
        files: ['server/**/*.ts', 'server/**/*.tsx'],
        parserOptions: {
          project: ['./server/tsconfig.json'],
        },
      },
    ],
  };
  