// // @ts-check
// import { defineConfig, devices } from '@playwright/test';

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // import path from 'path';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * @see https://playwright.dev/docs/test-configuration
//  */
// export default defineConfig({
//   testDir: './tests',
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: 'html',
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use: {
//     /* Base URL to use in actions like `await page.goto('')`. */
//     // baseURL: 'http://localhost:3000',

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     trace: 'on-first-retry',
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },

//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },

//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });


// // @ts-check
// import { defineConfig, devices } from '@playwright/test';
// import path from 'path';
// import fs from 'fs';

// /** Load settings.json safely */
// const settingsPath = path.resolve(__dirname, 'settings.json');

// if (!fs.existsSync(settingsPath)) {
//   throw new Error(`settings.json NOT FOUND at: ${settingsPath}`);
// }

// const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

// /**
//  * @see https://playwright.dev/docs/test-configuration
//  */
// export default defineConfig({
//   testDir: './tests',

//   /* Parallel or Sequential execution */
//   fullyParallel: settings.parallelExecution,   // ✓ connected to settings.json

//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,

//   workers: settings.parallelExecution ? undefined : 1, // ✓ run sequentially if false

//   reporter: 'html',

//   use: {
//     /** Base URL used by your UI tests */
//     baseURL: "https://www.saucedemo.com",

//     /** Headless or Headed — controlled by settings.json */
//     headless: settings.runHeadless,

//     trace: 'on-first-retry',
//     video: "retain-on-failure",
//     screenshot: "only-on-failure"
//   },

//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },
//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     }
//   ],
// });

// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const settingsPath = path.join(process.cwd(), 'settings.json');
let settings = {
  parallelExecution: true,
  runHeadless: true,
  workers: undefined,
  baseURL: 'https://www.saucedemo.com',
   runMode: "parallel",
  headed: false
};

if (fs.existsSync(settingsPath)) {
  try {
    // const raw = fs.readFileSync(settingsPath, 'utf8');
    // const parsed = JSON.parse(raw);
    const raw = fs.readFileSync('./settings.json', 'utf8');
  settings = JSON.parse(raw);
    //settings = { ...settings, ...parsed };
    console.log('Loaded settings.json:', settingsPath);
  } catch (e) {
    console.warn('Could not parse settings.json — using defaults.', e);
  }
} else {
  console.log('settings.json not found — using default settings. To override create settings.json in project root.');
}

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: !!settings.parallelExecution,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: settings.parallelExecution ? (settings.workers || undefined) : 1,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: settings.baseURL,                            //1
   //baseURL: 'https://your-real-aut-url.com',
    headless: !!settings.runHeadless,                     //2
   //headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});


