import {Page, Locator} from '@playwright/test';

export class BooksPage{
    readonly page: Page;
    readonly searchBox: Locator;
    readonly loginButton: Locator;

    constructor(page:Page) {
        this.page = page;
        this.searchBox = page.getByPlaceholder('Type to search');
        this.loginButton = page.getByRole('button', {name:'Login'});
    }
    async goto(){
        await this.page.goto('/books');
    }

    async search(keyword:string){
        await this.searchBox.fill(keyword);
    }
}
