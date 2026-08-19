import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
    await page.goto('https://demoqa.com/login');
    await page.getByPlaceholder('UserName').fill('tamnt254');
    await page.getByPlaceholder('Password').fill('Test@1234!');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://demoqa.com/profile');
    await page.context().storageState({ path: '.auth/user.json' });
});