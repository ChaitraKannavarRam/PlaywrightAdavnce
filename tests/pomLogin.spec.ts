import {test, expect} from '../fixtures/fixtures'; // Adjust the path to your fixtures file

import { LoginPage } from '../pages/LoginPage';

test('Verify user can log in and log out successfully using POM', async ({ loginPage }) => {
    // const loginPage = new LoginPage(page);

    // 1. Navigate to the practice application
    await loginPage.navigate();
    
    await loginPage.login('student', 'Password123');
    
    // 3. Assertions (Using strict web assertions)
    await expect(loginPage.page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
    await expect(loginPage.page.locator('.post-title')).toHaveText('Logged In Successfully');
    await expect(loginPage.page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();

    await loginPage.page.context().storageState({path:"./auth.json"})
    
    // 4. Post-condition: Cleanup by logging out
    await loginPage.page.getByRole('link', { name: 'Log out' }).click();
    
    // 5. Final verification to ensure we are back on the login page
    await expect(loginPage.page).toHaveURL(/.*practice-test-login/);
});