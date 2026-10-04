import { expect, test } from '@playwright/test';

const STATIC_ROUTES = [
  '/',
  '/about',
  '/business',
  '/business/commerce',
  '/business/distribution',
  '/business/retail-finance',
  '/business/dipty',
  '/impact',
  '/opportunity',
  '/media',
  '/news',
  '/career',
  '/contact',
  '/portfolio',
  '/portfolio/2',
  '/sign-in',
  '/sign-up',
  '/dashboard',
] as const;

const DETAIL_LINKS = [
  { listing: '/career', href: 'a[href*="/career/"]' },
  { listing: '/media', href: 'a[href*="/media/"]' },
  { listing: '/news', href: 'a[href*="/news/"]' },
  { listing: '/', href: 'a[href*="/pages/"]' },
] as const;

const VIEWPORTS = [
  { name: 'small-mobile', width: 320, height: 720 },
  { name: 'mobile', width: 375, height: 812 },
  { name: 'large-mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

test.describe('Responsive routes', () => {
  for (const viewport of VIEWPORTS) {
    test(`renders routes without overflow at ${viewport.name}`, async ({ browserName, page }) => {
      test.skip(
        browserName !== 'chromium' && ![390, 1440].includes(viewport.width),
        'Firefox and WebKit exercise the mobile and desktop boundary viewports',
      );

      await page.setViewportSize(viewport);

      for (const route of STATIC_ROUTES) {
        const response = await page.goto(route, { waitUntil: 'domcontentloaded' });

        expect(response?.status(), `${route} returns a successful response`).toBeLessThan(400);
        await expect(page.locator('body')).toBeVisible();

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `${route} has no horizontal page overflow`).toBeLessThanOrEqual(1);
      }

      for (const detail of DETAIL_LINKS) {
        await page.goto(detail.listing, { waitUntil: 'domcontentloaded' });
        const href = await page.locator(detail.href).first().getAttribute('href');
        if (!href) {
          continue;
        }

        const response = await page.goto(href, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), `${href} returns a successful response`).toBeLessThan(400);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `${href} has no horizontal page overflow`).toBeLessThanOrEqual(1);
      }
    });
  }

  test('opens mobile navigation with accessible controls', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const menuButton = page.getByRole('button', { name: 'Open menu' });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(menuButton).toBeFocused();
  });
});
