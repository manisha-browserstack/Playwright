const { test, expect } = require('@playwright/test');

const brands = ['Apple', 'Samsung', 'Google'];

for (const brand of brands) {
  test(`Filter by ${brand}`, async ({ page }) => {
    await page.goto('https://bstackdemo.com');
    await page.waitForLoadState('domcontentloaded');

    // Click brand filter
    await page.getByText(brand, { exact: true }).click();

    // Safe click on first "Add to cart"
    const addBtn = page.getByText('Add to cart', { exact: true }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.waitFor({ state: 'visible', timeout: 30000 });
    await addBtn.click({ force: true });

    // Verify cart content
    await expect(page.locator('.float-cart__content')).toContainText(brand);
  });
}
