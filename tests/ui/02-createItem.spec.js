const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const ItemPage = require('../../pages/ItemPage');
const fh = require('../../utils/fileHelper');


test('create item and save outcome', async ({ page }) => {
const login = new LoginPage(page);
await login.goto();
await login.login('demoUser', 'demoPass');


const home = new HomePage(page);
await home.createNew();


const item = new ItemPage(page);
const result = await item.createItem('Playwright Item', 'created by test');


// Save outcome for other tests
fh.writeJson('createItemOutcome.json', { created: true, result });


expect(result.length).toBeGreaterThan(0);
});