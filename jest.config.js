/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['app.js'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};