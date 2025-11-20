// const { test, expect, request } = require('@playwright/test');
// const fs = require('fs');
// const FormData = require('form-data');
// const fh = require('../../utils/fileHelper');


// // Upload file we downloaded previously to ConvertAPI upload endpoint
// test('upload previously downloaded file to convertapi', async ({ request }) => {
// const filePath = fh.OUT_DIR + '/downloaded-sample.pdf';
// if (!fs.existsSync(filePath)) test.skip(true, 'downloaded file not found');


// // ConvertAPI supports multipart/form-data to https://v2.convertapi.com/upload
// const form = new FormData();
// form.append('file', fs.createReadStream(filePath));


// const secret = process.env.CONVERTAPI_SECRET || '';
// const url = 'https://v2.convertapi.com/upload' + (secret ? ('?Secret=' + secret) : '');


// const headers = form.getHeaders();
// const response = await request.post(url, { headers, data: form });
// expect(response.ok()).toBeTruthy();
// const json = await response.json();
// console.log('upload response', json);
// fh.writeJson('uploadResponse.json', json);
// });

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const fh = require('../../utils/fileHelper');

test('upload previously downloaded file to convertapi', async ({ request }) => {
  const filePath = fh.OUT_DIR + '/downloaded-sample.pdf';
  if (!fs.existsSync(filePath)) test.skip(true, 'downloaded file not found');

  const secret = process.env.CONVERTAPI_SECRET || '';
  const url = 'https://v2.convertapi.com/upload' + (secret ? ('?Secret=' + secret) : '');

  const response = await request.post(url, {
    multipart: {
      file: {
        name: 'downloaded-sample.pdf',
        mimeType: 'application/pdf',
        buffer: fs.readFileSync(filePath)
      }
    }
  });

  expect(response.ok()).toBeTruthy();
  const json = await response.json();
  console.log('upload response', json);
  fh.writeJson('uploadResponse.json', json);
});
