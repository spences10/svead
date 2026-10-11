import { expect, test } from '@playwright/test';

test('line numbers toggle on every code block and stay out of copies', async ({
	page,
	context,
}) => {
	await context.grantPermissions([
		'clipboard-read',
		'clipboard-write',
	]);
	await page.goto('/quick-reference', { waitUntil: 'networkidle' });

	const numbers = page.locator('.twinkleplop .ln');
	await expect(numbers.first()).toBeHidden();

	await page
		.getByRole('button', { name: 'Line numbers' })
		.first()
		.click();
	await expect(numbers.first()).toBeVisible();
	await expect(numbers.last()).toBeVisible();

	await page
		.getByRole('button', { name: 'Copy code' })
		.first()
		.click();
	expect(
		await page.evaluate(() => navigator.clipboard.readText()),
	).toBe('pnpm add -D svead');
});
