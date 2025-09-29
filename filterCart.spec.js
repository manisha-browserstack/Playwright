const { test, expect } = require('@playwright/test');

async function safeClick(page, locatorText) {
  const el = page.locator(locatorText).first();
  await el.waitFor({ state: 'attached', timeout: 30000 });
  await el.waitFor({ state: 'visible', timeout: 30000 });
  await el.scrollIntoViewIfNeeded();
  await el.click({ force: true });
}

test('Filter products and add to cart', async ({ page }) => {
  await page.goto('https://bstackdemo.com');
  await page.waitForLoadState('domcontentloaded');

  await safeClick(page, 'text=Apple');
  await safeClick(page, 'text=Add to cart');

  await expect(page.locator('.float-cart__content')).toContainText('Apple');
});
