import {test, expect} from '@playwright/test';
import invalidCredentialsFromFile from './data/invalid-credentials.json';

//Negative test 1: login with wrong credential
test('login with wrong credentials show error @regression', async({page}) => {
    await page.goto('https://demoqa.com/login');
    await page.getByPlaceholder('Username').fill('wronguser');
    await page.getByPlaceholder('Password').fill('wrongpass');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByText('Invalid username or password!')).toBeVisible();
});

//Negative test 2: data-driven with test.each
const invalidCredentials = [
    {username: 'wronguser', password: 'wrongpassword', label: 'wrong username and password'},
    {username: 'testUser', password: 'wrongpassword', label: 'wrong password only'},
    {username: 'wronguser', password:'Test@1234', label: 'wrong username only'}
]


for (const { username, password, label } of invalidCredentials) {
    test(`login fails @regression: ${label}`, async({page}) => {
        await page.goto('https://demoqa.com/login');
        await page.getByPlaceholder('Username').fill(username);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.getByText('Invalid username or password!')).toBeVisible();

    });
}

for (const { username, password, label } of invalidCredentialsFromFile) {
    test(`login fails with data from file @regression: ${label}`, async({page}) => {
        await page.goto('https://demoqa.com/login');
        await page.getByPlaceholder('Username').fill(username);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.getByText('Invalid username or password!')).toBeVisible();

    });
}