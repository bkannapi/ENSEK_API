const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  browser: "chrome",
  headed: true,
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: 0,
  videosFolder: "cypress/videos",
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    specPattern: ["**/*.feature", "cypress/**/*.cy.{js,jsx,ts,tsx}"],    
  }
});
