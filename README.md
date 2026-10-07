# OrKonijnProject

Playwright end-to-end tests with Allure reporting.

## Run the tests

```bash
pnpm install
pnpm exec playwright install chromium
pnpm run test:e2e
```

Playwright writes Allure results to `allure-results/`.
Each test result also includes a full-page screenshot attachment, visible in the
test's attachments in the Allure report.

## View the Allure report

Generate a static report, then open it in a browser:

```bash
pnpm run allure:generate
pnpm run allure:open
```

Or generate and serve the report in one step:

```bash
pnpm run allure:serve
```
