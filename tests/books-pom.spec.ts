import {test,expect} from '@playwright/test';
import { BooksPage } from '../pages/BooksPage';

test('search using POM', async({page}) => {
    const booksPage = new BooksPage(page);

    await booksPage.goto();
    await booksPage.search('Speaking JavaScript');

    await expect(page.getByText('Speaking JavaScript')).toBeVisible();
});