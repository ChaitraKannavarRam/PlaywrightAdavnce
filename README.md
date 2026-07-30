npx allure serve allure-results
npm install --save-dev allure-playwright allure-commandline

ENV=qa npx playwright test tests/login.spec.ts --headed

npx playwright show-trace /Users/chaitrakr/Downloads/trace