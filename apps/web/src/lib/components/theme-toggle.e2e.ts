import { expect, test } from '@playwright/test';

test('theme toggle cycles light, dark and system', async ({
	page,
}) => {
	await page.goto('/', { waitUntil: 'networkidle' });
	const toggle = page.getByRole('button', { name: /^Theme:/ });
	const html = page.locator('html');

	await expect(toggle).toHaveAccessibleName(/^Theme: System/);

	await toggle.click();
	await expect(html).toHaveAttribute('data-theme', 'light');

	await toggle.click();
	await expect(html).toHaveAttribute('data-theme', 'dark');

	// The choice is there before the app starts on the next visit
	await page.reload();
	await expect(html).toHaveAttribute('data-theme', 'dark');
	await expect(toggle).toHaveAccessibleName(/^Theme: Dark/);

	await toggle.click();
	await expect(html).not.toHaveAttribute('data-theme');
	await expect(toggle).toHaveAccessibleName(/^Theme: System/);
});
