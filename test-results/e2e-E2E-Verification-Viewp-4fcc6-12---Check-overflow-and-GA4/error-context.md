# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> E2E Verification >> Viewport 375x812 - Check overflow and GA4
- Location: e2e.spec.ts:13:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8787/
Call log:
  - navigating to "http://localhost:8787/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const viewports = [
  4  |   { width: 375, height: 812 },   // mobile
  5  |   { width: 390, height: 844 },   // mobile
  6  |   { width: 768, height: 1024 },  // tablet
  7  |   { width: 1280, height: 800 },  // laptop
  8  |   { width: 1536, height: 960 }   // desktop
  9  | ];
  10 | 
  11 | test.describe('E2E Verification', () => {
  12 |   viewports.forEach((vp) => {
  13 |     test(`Viewport ${vp.width}x${vp.height} - Check overflow and GA4`, async ({ page }) => {
  14 |       await page.setViewportSize(vp);
  15 |       const url = process.env.URL || 'http://localhost:8787/';
  16 |       
  17 |       // Navigate to the page
> 18 |       await page.goto(url);
     |                  ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8787/
  19 |       
  20 |       // 1. Check for horizontal overflow
  21 |       const hasOverflow = await page.evaluate(() => {
  22 |         return document.documentElement.scrollWidth > window.innerWidth;
  23 |       });
  24 |       expect(hasOverflow).toBeFalsy();
  25 | 
  26 |       // 2. Take a screenshot
  27 |       await page.screenshot({ path: `screenshots/home-${vp.width}x${vp.height}.png`, fullPage: true });
  28 | 
  29 |       // 3. Test GA4 script behavior
  30 |       let ga4Loader = await page.$('#ga4-loader');
  31 |       expect(ga4Loader).toBeNull(); // Should not exist before consent
  32 | 
  33 |       // Accept cookies
  34 |       const acceptBtn = await page.getByText('Accept', { exact: true });
  35 |       if (await acceptBtn.isVisible()) {
  36 |         await acceptBtn.click();
  37 |       }
  38 | 
  39 |       // Check GA4 script is injected after accept
  40 |       await page.waitForTimeout(1000); // give it a moment to inject
  41 |       ga4Loader = await page.$('#ga4-loader');
  42 |       expect(ga4Loader).not.toBeNull(); // Should exist now
  43 |     });
  44 |   });
  45 | 
  46 |   test('Contact Form E2E', async ({ page }) => {
  47 |     const url = process.env.URL || 'http://localhost:8787/';
  48 |     await page.goto(url);
  49 | 
  50 |     // Fill form
  51 |     await page.getByLabel('Name').fill('Playwright Test');
  52 |     await page.getByLabel('Email').fill('test@playwright.dev');
  53 |     await page.getByLabel('Message').fill('This is a test message from Playwright E2E.');
  54 |     
  55 |     // Submit
  56 |     const submitBtn = await page.getByRole('button', { name: /Send Message/i });
  57 |     await submitBtn.click();
  58 | 
  59 |     // Verify success toast (sonner)
  60 |     const successToast = await page.getByText(/Message sent/i);
  61 |     await expect(successToast).toBeVisible();
  62 | 
  63 |     // Verify no navigation happened (still on same page)
  64 |     expect(page.url().replace(/\/$/, '')).toBe(url.replace(/\/$/, ''));
  65 |   });
  66 | });
  67 | 
```