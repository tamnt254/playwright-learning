import {test, expect} from './fixtures';

test('search book is visible', async ({booksPage}) => {
    await expect(booksPage.searchBox).toBeVisible();
});


test('search functionality works', async ({booksPage})=>{
    await booksPage.search('Speaking Javascript');
    await expect(booksPage.page.getByText('Speaking Javascript')).toBeVisible();
});