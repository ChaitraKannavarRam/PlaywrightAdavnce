import { test, expect } from '@playwright/test';

test('Verify user can log in and log out successfully', async ({ page }) => {
    // 1. Navigate to the practice application
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    
    // 2. Locate elements using precise CSS selectors
    await page.locator('#username').fill('student');
    await page.locator('#password').fill('Password123');
    
    // 3. Click submit using the explicit button role
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // 4. Assertions (Using strict web assertions)
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
    await expect(page.locator('.post-title')).toHaveText('Logged In Successfully');
    await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();

    await page.context().storageState({path:"./auth.json"})
    
    // 5. Post-condition: Cleanup by logging out
    await page.getByRole('link', { name: 'Log out' }).click();
    
    // 6. Final verification to ensure we are back on the login page
    await expect(page).toHaveURL(/.*practice-test-login/);


});


