import { expect, test, type Page } from '@playwright/test';

// Pages are prerendered, so they're on screen before the app has
// started. Keyboard shortcuts only exist once it has
const open_hydrated = (page: Page, path: string) =>
	page.goto(path, { waitUntil: 'networkidle' });

test.describe('command palette', () => {
	test('finds a page by keyword', async ({ page }) => {
		await open_hydrated(page, '/');
		await page.keyboard.press('Control+k');

		const input = page.getByRole('combobox', {
			name: 'Search the docs',
		});
		await expect(input).toBeFocused();

		// "pnpm" is a keyword of the quick reference, not in its name
		await input.fill('pnpm');
		await expect(page.getByRole('option').first()).toContainText(
			'Quick reference',
		);
		await page.keyboard.press('Enter');

		await expect(page).toHaveURL('/quick-reference');
		await expect(
			page.getByRole('heading', {
				level: 1,
				name: 'Quick Reference',
			}),
		).toBeVisible();
		await expect(page.getByRole('dialog')).toBeHidden();
	});

	test('goes straight to a section', async ({ page }) => {
		await open_hydrated(page, '/');
		await page.keyboard.press('Control+k');
		await page.getByRole('combobox').fill('twitter card types');
		await page.keyboard.press('Enter');

		await expect(page).toHaveURL(
			'/best-practices#twitter-card-types',
		);
		await expect(
			page.getByRole('heading', { name: 'Twitter Card Types' }),
		).toBeInViewport();
	});

	test('opens from the header and closes on escape', async ({
		page,
	}) => {
		await open_hydrated(page, '/faq');
		await page
			.getByRole('banner')
			.getByRole('button', { name: 'Search the docs' })
			.click();

		await expect(page.getByRole('dialog')).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog')).toBeHidden();
	});

	test('switches theme', async ({ page }) => {
		await open_hydrated(page, '/');
		await page.keyboard.press('/');
		await page.getByRole('combobox').fill('dark');
		await page.keyboard.press('Enter');

		await expect(page.locator('html')).toHaveAttribute(
			'data-theme',
			'dark',
		);
	});
});
