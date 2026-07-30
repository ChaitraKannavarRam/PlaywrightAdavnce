import { test, expect } from '@playwright/test';

test.describe('Alerts Handling', () => {
  test('should register listener before clicking the alert button', async ({ page }) => {
    await page.goto('https://letcode.in/alert');

    // 1. SETUP THE LISTENER FIRST (Tells Playwright: "Listen for an alert")
    page.on('dialog', async (dialog) => {
        console.log(`Dialog message captured: ${dialog.message()}`);
        expect(dialog.message()).toContain('Enter your name');
        await dialog.accept("hi"); // Clicks "OK" on the alert
        // await dialog.dismiss(); // Clicks "Cancel" on the alert (if applicable)
        // await dialog.type("This is a test input"); // Types into the alert prompt (if applicable)
    });

    // 2. TRIGGER THE ACTION SECOND (Now Playwright is actively listening)
    await page.getByRole('button', { name: 'Prompt Alert' }).click();
  });
});
    

// dialog.type(): Returns 'alert', 'confirm', 'prompt', or 'beforeunload'
// .dialog.message(): Extracts the exact text string displayed inside the popup window.
// dialog.accept([defaultValue]): Confirms the dialog. Accepts an optional string parameter for prompt inputs.
// dialog.dismiss(): Cancels or closes the dialog without submitting changes.

test('should handle modern alerts', async ({ page }) => {
    await page.goto('https://letcode.in/alert');
    await page.getByRole('button', { name: 'Modern Alert' }).click();
    await page.getByRole('button', { name: 'close' }).click();
});