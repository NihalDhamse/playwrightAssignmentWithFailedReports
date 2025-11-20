const { test, expect, request } = require('@playwright/test');
const fh = require('../../utils/fileHelper');


// Example of using auth token for a ConvertAPI conversion endpoint
test('use auth token to call convert endpoint', async ({ request }) => {
const upload = fh.readJson('uploadResponse.json');
if (!upload || !upload.FileId) test.skip(true, 'no uploaded file id');


const secret = process.env.CONVERTAPI_SECRET;
if (!secret) test.skip(true, 'CONVERTAPI_SECRET not set');


const fileId = upload.FileId;
const convertUrl = `https://v2.convertapi.com/convert/pdf/to/jpg?Secret=${encodeURIComponent(secret)}&File=${encodeURIComponent(fileId)}`;


const resp = await request.get(convertUrl);
expect(resp.ok()).toBeTruthy();
const json = await resp.json();
fh.writeJson('convertResponse.json', json);
});