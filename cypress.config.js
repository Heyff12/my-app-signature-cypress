const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight:1080,
  viewportWidth: 1920,
  env: {
    host: 'abc'
  },
  e2e: {
    baseUrl: "http://localhost:3002",
    specPattern:'cypress/e2e/**/*.cy.js',
    excludeSpecPattern: ['**/e2e'],
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('./cypress/support/e2e')
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
