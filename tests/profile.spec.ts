import {test, expect} from '@playwright/test';

test('user is logged in - profile page visible @smoke', async ({page}) => {
    await page.goto('/profile');
    await expect(page.getByText('tamnt254')).toBeVisible();
});