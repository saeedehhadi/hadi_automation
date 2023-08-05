const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    ownloadsFolder: 'cypress/downloads',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
    watchForFileChanges: false,
    video: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos',
    videoUploadOnPasses: false,
  },
});
