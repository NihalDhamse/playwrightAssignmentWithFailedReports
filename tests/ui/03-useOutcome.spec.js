const { test, expect } = require('@playwright/test');
const fh = require('../../utils/fileHelper');


test('read outcome file and assert', async ({ page }) => {
// This test reads the file produced by the previous test and uses its content
const data = fh.readJson('createItemOutcome.json');
console.log('Read outcome:', data);
expect(data.created).toBe(true);
expect(data.result).toBeTruthy();
});