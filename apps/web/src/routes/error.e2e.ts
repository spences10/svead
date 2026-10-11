import { expect, test } from '@playwright/test';

test('unknown pages are a 404 that points back into the docs', async ({
	page,
}) => {
	const response = await page.goto('/not-a-page', {
		waitUntil: 'networkidle',
	});

	expect(response?.status()).toBe(404);
	await expect(
		page.getByRole('heading', { name: 'This glass is empty' }),
	).toBeVisible();

	await page
		.getByRole('main')
		.getByRole('button', { name: 'Search the docs' })
		.click();
	await expect(page.getByRole('dialog')).toBeVisible();
});
