import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Localized routes', () => {
    test('renders English sign-in content', async ({ page }) => {
      await page.goto('/sign-in');
      await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
      await expect(page.getByLabel('Email')).toBeVisible();
    });

    test('renders Bengali sign-in content without overflow', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 720 });
      await page.goto('/bn/sign-in');

      await expect(page.getByRole('heading', { name: 'সাইন ইন' })).toBeVisible();
      await expect(page.getByLabel('ইমেইল')).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });
  });
});
