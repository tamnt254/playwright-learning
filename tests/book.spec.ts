import {test,expect} from '@playwright/test';
import { BooksPage } from '../pages/BooksPage';

test('verify that the page /books has correct title', async ({page}) => {
    const booksPage = new BooksPage(page);
    await booksPage.goto();
    await expect(booksPage.loginButton).toBeEnabled();
}

);


test('verify that the Search Book box is visible', async({page}) => {
    const booksPage = new BooksPage(page);
    await booksPage.goto();
    await expect(booksPage.searchBox).toBeVisible();
}
);

test('verify that the Sarch functionalty is working as expected', async ({page}) => {
    const booksPage = new BooksPage(page);
    await booksPage.goto();
    await booksPage.search('Speaking JavaScript');
    await expect(page.getByText('Speaking JavaScript')).toBeVisible();

}

);


