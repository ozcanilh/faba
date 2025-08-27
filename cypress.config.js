const { defineConfig } = require('cypress');

module.exports = defineConfig({
  retries: 1,
  e2e: {
    baseUrl: 'https://www.trendyol.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    experimentalMemoryManagement: true,
    chromeWebSecurity: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss',
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          console.log('Adding Chromium flag:');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--disable-extensions');
          launchOptions.args.push(
            '--js-flags="--max_old_space_size=1024 --max_semi_space_size=1024"'
          );
        }
        return launchOptions;
      });
      return config;
    },
  },
});
