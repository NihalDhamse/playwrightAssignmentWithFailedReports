const { test, expect, request } = require('@playwright/test');
const fh = require('../../utils/fileHelper');


// Download a sample file and save it under artifacts
test('download remote file and save', async ({ request }) => {
const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
const resp = await request.get(url);
expect(resp.ok()).toBeTruthy();
const buffer = await resp.body();
const path = fh.writeBinary('downloaded-sample.pdf', buffer);
console.log('downloaded ->', path);
});