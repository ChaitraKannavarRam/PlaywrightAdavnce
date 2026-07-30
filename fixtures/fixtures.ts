import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Adjust this path to your actual page object

// Define the types for our custom fixtures
type MyFixtures = {
  loginPage: LoginPage;
};

// Extend the base test to include our fixtures
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Instantiate the page object and pass it to the test
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';