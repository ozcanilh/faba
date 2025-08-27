const axios = require('axios');
const fs = require('fs');
const path = require('path');

const reportPath = path.resolve(
  __dirname,
  '../cypress/reports/html/merged-report.json',
);
const runNumber = process.env.GITHUB_RUN_NUMBER;
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || 
  'https://hooks.slack.com/services/...'; // Replace with your actual Slack webhook URL

// GitHub Pages URL
const reportUrl = `https://yourusername.github.io/faba/index_${runNumber}.html`; // Replace with your actual GitHub Pages URL

if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  const totalTests = report.stats.tests;
  const passTests = report.stats.passes;
  const failTests = report.stats.failures;
  const skipTests = report.stats.skipped || 0;
  const passPercent = Math.floor(report.stats.passPercent) + '%';
  const duration = (report.stats.duration / 1000 / 60).toFixed(2) + ' min';
  const messageColor = failTests > 0 ? ':warning:' : ':white_check_mark:';
  const runBy = process.env.RUN_BY;
  const module = process.env.MODULES;
  const environment = process.env.CYPRESS_ENV;
  let testName = "Cypress";
  let viewport = " | *Viewport:* chrome & macbook-15";

  const message = {
    text: "*" + testName + " Test Results: " + messageColor + "*\n*Module:* " + module + " | *Total Tests:* " + totalTests + " | *Passed:* " + passTests + " | *Failed:* " + failTests + " | *Skipped:* " + skipTests + " | *Pass Percentage:* " + passPercent + " | *Duration:* " + duration + viewport + " | *Env:* " + environment + " | *Run By:* " + runBy + " | For detailed report: <" + reportUrl + "|Result>",
    mrkdwn: true,
  };
  
  const body = {
    channel: '#tests-results',
    username: 'webhookbot',
    text: message.text,
    icon_emoji: ':information_source:',
  };

  axios
    .post(slackWebhookUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      console.log('Message sent to Slack successfully.');
    })
    .catch((error) => {
      console.error('Error sending message to Slack:', error);
    });
} else {
  console.error('Mochawesome report not found!');
}
