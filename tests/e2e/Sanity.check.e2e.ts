import { expect, test } from '@playwright/test';

// Checkly is a tool used to monitor deployed environments, such as production or preview environments.
// It runs end-to-end tests with the `.check.e2e.ts` extension after each deployment to ensure that the environment is up and running.
// With Checkly, you can monitor your production environment and run `*.check.e2e.ts` tests regularly at a frequency of your choice.
// If the tests fail, Checkly will notify you via email, Slack, or other channels of your choice.
// On the other hand, E2E tests ending with `*.e2e.ts` are only run before deployment.
// You can run them locally or on CI to ensure that the application is ready for deployment.

test.describe('Sanity', () => {
  test.describe('Static pages', () => {
    test('displays the homepage', async ({ page }) => {
      const response = await page.goto('/');
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('displays the about page', async ({ page }) => {
      const response = await page.goto('/about');
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('displays the portfolio page', async ({ page }) => {
      const response = await page.goto('/portfolio');
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator('main').getByRole('link', { name: /^Portfolio/u })).toHaveCount(6);
    });
  });
});
