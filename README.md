![CI](https://github.com/tamnt254/playwright-learning/actions/workflows/playwright.yml/badge.svg)
# Playwright Test Automation Framework

An end-to-end test automation framework built with **Playwright** and **TypeScript**, demonstrating modern QA engineering practices including Page Object Model, custom fixtures, API testing, and CI/CD integration.

## Tech Stack

- **Playwright** – E2E test framework
- **TypeScript** – Strongly typed test code
- **GitHub Actions** – CI/CD pipeline (runs on every push to `main`)

## Test Coverage

| Area | File | Description |
|------|------|-------------|
| UI – Login page | `tests/login.spec.ts` | Page title, field visibility, locator practice |
| UI – Book Store | `tests/book.spec.ts` | Book list, search functionality |
| UI – POM | `tests/books-pom.spec.ts` | Same tests refactored using Page Object Model |
| UI – Fixtures | `tests/book-fixture.spec.ts` | Custom fixtures for shared test setup |
| API | `tests/api.spec.ts` | GET/POST requests, response validation, API+UI hybrid test |

## Project Structure

```
playwright-learning/
├── pages/
│   └── BooksPage.ts          # Page Object for Book Store page
├── tests/
│   ├── fixtures.ts           # Custom Playwright fixtures
│   ├── login.spec.ts
│   ├── book.spec.ts
│   ├── books-pom.spec.ts
│   ├── book-fixture.spec.ts
│   └── api.spec.ts
├── playwright.config.ts
└── .github/
    └── workflows/
        └── playwright.yml    # CI/CD pipeline
```

## Key Patterns Demonstrated

**Page Object Model** – Locators and actions encapsulated in reusable page classes:
```typescript
export class BooksPage {
  readonly searchBox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.searchBox = page.getByPlaceholder('Type to search');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async search(keyword: string) {
    await this.searchBox.fill(keyword);
  }
}
```

**Custom Fixtures** – Shared setup/teardown injected directly into tests:
```typescript
export const test = base.extend<MyFixtures>({
  booksPage: async ({ page }, use) => {
    const booksPage = new BooksPage(page);
    await booksPage.goto();
    await use(booksPage);
  },
});
```

**API Testing** – Native Playwright request fixture with hybrid API+UI validation:
```typescript
test('api setup + ui verify', async ({ request, page }) => {
  const response = await request.get('/BookStore/v1/Books');
  const book = (await response.json()).books[0];
  await page.goto('/books');
  await expect(page.getByText(book.title)).toBeVisible();
});
```

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/<your-username>/playwright-learning.git
cd playwright-learning

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run a specific browser
npx playwright test --project=chromium

# Open UI mode
npx playwright test --ui
```

## CI/CD

The pipeline triggers automatically on every push or pull request to `main`.

Pipeline steps:
1. Checkout code
2. Set up Node.js 22
3. `npm ci` – install exact dependency versions
4. `npx playwright install --with-deps` – download browsers
5. Run all tests
6. Upload HTML report as artifact (available even when tests fail)

View pipeline runs → [GitHub Actions](.github/workflows/playwright.yml)

## Configuration

Tests run against **https://demoqa.com** across 3 browsers:

| Browser | Device Profile |
|---------|---------------|
| Chromium | Desktop Chrome |
| Firefox | Desktop Firefox |
| WebKit | Desktop Safari |

```typescript
// playwright.config.ts
timeout: 60000,       // test timeout
retries: 2,           // retry failed tests on CI
workers: 1,           // sequential on CI, parallel locally
baseURL: 'https://demoqa.com'
```
