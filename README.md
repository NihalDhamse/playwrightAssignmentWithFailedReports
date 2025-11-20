# playwrightAssignmentWithFailedReports
Playwright JS Test for Web Application

Setup
Node 16+ installed.
Clone repo or copy files to folder.
Install dependencies: npm install
(Optional) Create settings.json in project root to override defaults: { "parallelExecution": true, "runHeadless": true, "workers": 2, "baseURL": "https://www.saucedemo.com" }

(Optional) Set ConvertAPI secret for conversion tests:

Windows PowerShell: $env:CONVERTAPI_SECRET='your_secret'
Linux/macOS: export CONVERTAPI_SECRET=your_secret
Run tests
run all tests (uses settings.json defaults)
npx playwright test

run headed
npx playwright test --headed

run only UI
npx playwright test tests/ui

run only API
npx playwright test tests/api

view report
npx playwright show-report


Playwright Tests workflow run
Note : Generated failed test cases for checking reports generated and take screenshot/recorded video of that failed test cases  
