// // cypress.config.js
// const { defineConfig } = require('cypress')
// const allureWriter = require('@shelex/cypress-allure-plugin/writer');

// module.exports = defineConfig({
//   //junit
//   //reporter: 'junit',
//   reporterOptions: {
//     mochaFile: 'results/my-test-output.xml',
//     toConsole: true,
//   },
// //mochawsome
//   //reporter: 'cypress-mochawesome-reporter',
//   reporter: 'cypress-mochawesome-reporter',
//   e2e: {
//     //capture vider/ screenshoot
//     video: false,
//     screenshotsFolder: 'cypress/screenshots',
//     videosFolder: 'cypress/videos',

//     setupNodeEvents(on, config) {
//       require('cypress-mochawesome-reporter/plugin')(on);
//       allureWriter(on, config);
//       const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
//       cypressGrepPlugin(config)
//       return config
//     },
//   },
// })


// cypress.config.js
const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  // JUnit (optionnel)
  reporterOptions: {
    mochaFile: 'results/my-test-output.xml',
    toConsole: true,
  },

  // Mochawesome reporter
  reporter: 'cypress-mochawesome-reporter',

  // ⚡️ Allure configuration
  env: {
    allure: true,
    allureResultsPath: 'allure-results',
    allureReuseAfterSpec: true,
  },

  e2e: {
    video: false,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      allureWriter(on, config);

      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin');
      cypressGrepPlugin(config);

      return config;
    },
  },
});
