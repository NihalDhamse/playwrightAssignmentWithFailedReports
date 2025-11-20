const { test, expect } = require('@playwright/test');


test('headed vs headless check', async ({ page, browserName }) => {
// The run mode (headless/headed) is controlled by settings.json via playwright.config.js
await page.goto('/');
expect(await page.title()).toBeTruthy();
});