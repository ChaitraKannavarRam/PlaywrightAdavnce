import {test, expect} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

test('Verify user can log in and log out successfully using POM', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Navigate to the practice application
    await loginPage.navigate();
    
    // 2. Perform login using the Page Object Model
    await loginPage.login('student', 'Password123');
    
    // 3. Assertions (Using strict web assertions)
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
    await expect(page.locator('.post-title')).toHaveText('Logged In Successfully');
    await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();

    await page.context().storageState({path:"./auth.json"})
    
    // 4. Post-condition: Cleanup by logging out
    await page.getByRole('link', { name: 'Log out' }).click();
    
    // 5. Final verification to ensure we are back on the login page
    await expect(page).toHaveURL(/.*practice-test-login/);
});