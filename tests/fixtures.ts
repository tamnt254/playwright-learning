import {test as base} from '@playwright/test';
import { BooksPage } from '../pages/BooksPage';

// Define type for my fixture
type MyFixtures = {
    booksPage: BooksPage;
};

// Extend default test of Playwright
export const test = base.extend<MyFixtures>({
    booksPage:async ({page}, use) => {
        const booksPage = new BooksPage(page);
        await booksPage.goto(); //setup before test runs
        await use(booksPage); //execute the test
        //after this line, can tear down if needed
    },
});
export{expect} from '@playwright/test';