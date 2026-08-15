import {test, expect} from '@playwright/test';

test('login page has correct title', async ({page}) => {
    await page.goto('https://demoqa.com/login');
    await expect(page).toHaveTitle('demosite');
});


test('login page has username and password fields', async({page}) => {
    await page.goto('https://demoqa.com/login');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button',{name: 'Login'})).toBeVisible();
});



test('practice locators', async({page}) => {
    await page.goto('https://demoqa.com/login');
    //getByPlaceholder
    const usernameField = page.getByPlaceholder('UserName');
    const passwordField = page.getByPlaceholder('Password');
    //getByRole
    const loginButton = page.getByRole('button', { name:'Login' });

    //Assert tat ca deu visible
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(loginButton).toBeVisible();
});


test('fill and submit login form', async({page}) => {
    await page.goto('https://demoqa.com/login');
    await page.getByPlaceholder('UserName').fill('testuser');
    await page.getByPlaceholder('Password').fill('Test@1234');
    await page.getByRole('button', {name: 'Login'}).click();
    //Login will be failed because the username and password do not exist.
    // However, we can aseert the form has ben already submitted by checking the URL change.
    await expect(page).toHaveURL(/login/);
});


test('assert form element state', async({page}) => {
    await page.goto('https://demoqa.com/login');
    //Button enabled
    await expect(page.getByRole('button', {name: 'Login'})).toBeEnabled();
    // Input có attribute đúng
    await expect(page.getByPlaceholder('Password')).toHaveAttribute('type','password');

    //Fill rồi kiểm tra value
    await page.getByPlaceholder('UserName').fill('testuser');
    await expect(page.getByPlaceholder('UserName')).toHaveValue('testuser');
});
