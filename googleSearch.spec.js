const { test, expect } = require('@playwright/test');

test('Search bstackdemo on Google and open first result', async ({ page }) => {
  // Go to Google homepage
  await page.goto('https://www.google.com');

  // Accept cookies if the consent popup appears
  const consentButton = page.locator('button:has-text("I agree")');
  if (await consentButton.isVisible()) {
    await consentButton.click();
  }

  // Type the search query and press Enter
  const searchBox = page.locator('input[name="q"]');
  await searchBox.fill('bstackdemo');
  await searchBox.press('Enter');

  // Wait for search results
  const firstResult = page.locator('h3:has-text("bstackdemo")').first();
  await firstResult.waitFor({ state: 'visible', timeout: 30000 });

  // Click the first result
  await firstResult.click();

  // Verify the URL contains "bstackdemo.com"
  await expect(page).toHaveURL(/bstackdemo.com/);
});
