import { test, expect } from '@playwright/test';

test.use({storageState:"./auth.json"});

test('Verify user can access the logged-in page using stored authentication state', async ({ page }) => {

await page.goto("https://practicetestautomation.com/logged-in-successfully/");
        await expect(page.locator('.post-title')).toHaveText('Logged In Successfully');

});