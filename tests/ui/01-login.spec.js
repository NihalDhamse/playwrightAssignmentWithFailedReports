const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');


test('login works', async ({ page }) => {
const login = new LoginPage(page);
await login.goto();
//await page.goto('/login');

// NOTE: for demo, use example creds — replace with valid ones for real AUT
await login.login('demoUser', 'demoPass');
await expect(page).toHaveURL(/dashboard|home/);
});