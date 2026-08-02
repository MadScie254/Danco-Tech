import { test, expect } from '@playwright/test';

const viewports = [
  { width: 375, height: 812 },   // mobile
  { width: 390, height: 844 },   // mobile
  { width: 768, height: 1024 },  // tablet
  { width: 1280, height: 800 },  // laptop
  { width: 1536, height: 960 }   // desktop
];

test.describe('E2E Verification', () => {
  viewports.forEach((vp) => {
    test(`Viewport ${vp.width}x${vp.height} - Check overflow and GA4`, async ({ page }) => {
      await page.setViewportSize(vp);
      const url = process.env.URL || 'http://localhost:8787/';
      
      // Navigate to the page
      await page.goto(url);
      
      // 1. Check for horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasOverflow).toBeFalsy();

      // 2. Take a screenshot
      await page.screenshot({ path: `screenshots/home-${vp.width}x${vp.height}.png`, fullPage: true });

      // 3. Test GA4 script behavior
      let ga4Loader = await page.$('#ga4-loader');
      expect(ga4Loader).toBeNull(); // Should not exist before consent

      // Accept cookies
      const acceptBtn = await page.getByText('Accept', { exact: true });
      if (await acceptBtn.isVisible()) {
        await acceptBtn.click();
      }

      // Check GA4 script is injected after accept
      await page.waitForTimeout(1000); // give it a moment to inject
      ga4Loader = await page.$('#ga4-loader');
      expect(ga4Loader).not.toBeNull(); // Should exist now
    });
  });

  test('Contact Form E2E', async ({ page }) => {
    const url = process.env.URL || 'http://localhost:8787/';
    await page.goto(url);

    // Fill form
    await page.getByLabel('Name').fill('Playwright Test');
    await page.getByLabel('Email').fill('test@playwright.dev');
    await page.getByLabel('Message').fill('This is a test message from Playwright E2E.');
    
    // Submit
    const submitBtn = await page.getByRole('button', { name: /Send Message/i });
    await submitBtn.click();

    // Verify success toast (sonner)
    const successToast = await page.getByText(/Message sent/i);
    await expect(successToast).toBeVisible();

    // Verify no navigation happened (still on same page)
    expect(page.url().replace(/\/$/, '')).toBe(url.replace(/\/$/, ''));
  });
});
