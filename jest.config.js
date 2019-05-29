// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // The root of where Jest will start looking for files
  rootDir: 'src',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(s?[ac]ss|less)$': 'identity-obj-proxy',
  },

  setupFiles: ['<rootDir>/.jest/register-context.js'],
};
