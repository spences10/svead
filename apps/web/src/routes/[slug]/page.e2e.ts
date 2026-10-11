import { expect, test } from '@playwright/test';

test.describe('docs page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components');
	});

	test('carries its own head and structured data', async ({
		page,
	}) => {
		await expect(page).toHaveTitle('Components | Svead');
		await expect(
			page.locator('link[rel="canonical"]'),
		).toHaveAttribute('href', 'https://svead.pages.dev/components');

		const json = await page
			.locator('script[type="application/ld+json"]')
			.textContent();
		const types = JSON.parse(json!)['@graph'].map(
			(node: { '@type': string }) => node['@type'],
		);
		expect(types).toEqual([
			'WebSite',
			'TechArticle',
			'BreadcrumbList',
		]);
	});

	test('marks the current page in the sidebar', async ({ page }) => {
		await expect(
			page
				.getByRole('navigation', { name: 'Documentation' })
				.first()
				.getByRole('link', { name: 'Components' }),
		).toHaveAttribute('aria-current', 'page');
	});

	test('links to the next page in reading order', async ({
		page,
	}) => {
		await expect(
			page
				.getByRole('navigation', { name: 'More documentation' })
				.getByRole('link', { name: /Common schema types/ }),
		).toHaveAttribute('href', '/schema-types-content');
	});
});
