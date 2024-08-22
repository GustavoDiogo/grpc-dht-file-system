module.exports = {
    transform: {
      '^.+\\.ts?$': [
        'ts-jest',
        {
          diagnostics: true,
          tsconfig: 'tsconfig.json',
        },
      ],
    },
    rootDir: './',
    testMatch: ['**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
    prettierPath: null,
    testTimeout: 3000000,
  };
  