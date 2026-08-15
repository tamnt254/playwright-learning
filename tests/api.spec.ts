import {test, expect, request} from '@playwright/test';

test('GET books - status 200', async({request}) => {
    const response = await request.get('https://demoqa.com/BookStore/v1/Books');
    expect (response.status()).toBe(200); 
});


test('GET books - response co data', async({request}) => {
    const response = await request.get('https://demoqa.com/BookStore/v1/Books');                                     
    const body = await response.json();

    expect(body.books).toBeDefined(); //// field "books" phải tồn tạie
    expect(body.books.length).toBeGreaterThan(0);
});     

test('POST - create new user', async({request}) => {
    const response = await request.post('https://demoqa.com/Account/v1/User', {
        data: {
            userName: 'testuser_tam',
            password: 'Test@1234!'
        }
    });
    // 201 = create user successfully, 406 = the user exists
    expect([201,406]).toContain(response.status());
});


test('GET - verify book detail', async({request}) => {
    const isbn = '9781449325862';
    const response = await request.get(`https://demoqa.com/BookStore/v1/Book?ISBN=${isbn}`);

    expect(response.status()).toBe(200);
    const book = await response.json();
    expect(book.title).toBe('Git Pocket Guide');
    expect(book.author).toBe('Richard E. Silverman');
    expect(book.publisher).toBe("O'Reilly Media");

});


test('API setup + UI verify', async({request, page}) =>{
    //Step 1: check the exist of the book by using API
    const isbn = '9781449325862';
    const apiResponse = await request.get(`https://demoqa.com/BookStore/v1/Book?ISBN=${isbn}`);
    expect (apiResponse.status()).toBe(200);

    const book = await apiResponse.json();

    //Step 2: open that book in UI and find it
    await page.goto('/books');
    await expect(page.getByText(book.title)).toBeVisible();
});


