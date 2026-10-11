import { expect, test, type Page } from '@playwright/test';

// Pages are prerendered, so they're on screen before the app has
// started. Keyboard shortcuts only exist once it has
const open_hydrated = (page: Page, path: string) =>
	page.goto(path, { waitUntil: 'networkidle' });

test('home page lists the docs', async ({ page }) => {
	await page.goto('/');

	await expect(
		page.getByRole('link', { name: /^Components Every option/ }),
	).toHaveAttribute('href', '/components');
});

test('editing the pint rewrites the example head', async ({
	page,
}) => {
	await page.goto('/');
	await page.getByLabel('Title').fill('Honey & Hops');

	await expect(
		page.getByLabel('Tags Head renders for this page'),
	).toContainText('<title>Honey & Hops</title>');
});

test('command palette finds a page by keyword', async ({ page }) => {
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
		page.getByRole('heading', { level: 1, name: 'Quick Reference' }),
	).toBeVisible();
	await expect(page.getByRole('dialog')).toBeHidden();
});

test('command palette goes straight to a section', async ({
	page,
}) => {
	await open_hydrated(page, '/');
	await page.keyboard.press('Control+k');
	await page.getByRole('combobox').fill('twitter card types');
	await page.keyboard.press('Enter');

	await expect(page).toHaveURL('/best-practices#twitter-card-types');
	await expect(
		page.getByRole('heading', { name: 'Twitter Card Types' }),
	).toBeInViewport();
});

test('command palette opens from the header and closes on escape', async ({
	page,
}) => {
	await page.goto('/faq');
	await page
		.getByRole('banner')
		.getByRole('button', { name: 'Search the docs' })
		.click();

	await expect(page.getByRole('dialog')).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog')).toBeHidden();
});

test('command palette switches theme', async ({ page }) => {
	await open_hydrated(page, '/');
	await page.keyboard.press('/');
	await page.getByRole('combobox').fill('dark');
	await page.keyboard.press('Enter');

	await expect(page.locator('html')).toHaveAttribute(
		'data-theme',
		'dark',
	);
});

test('theme toggle cycles light, dark and system', async ({
	page,
}) => {
	await page.goto('/');
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

test('line numbers toggle on every code block and stay out of copies', async ({
	page,
	context,
}) => {
	await context.grantPermissions([
		'clipboard-read',
		'clipboard-write',
	]);
	await page.goto('/quick-reference');

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

test('docs pages carry their own head and structured data', async ({
	page,
}) => {
	await page.goto('/components');

	await expect(page).toHaveTitle('Components | Svead');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'https://svead.pages.dev/components',
	);

	const json = await page
		.locator('script[type="application/ld+json"]')
		.textContent();
	const types = JSON.parse(json!)['@graph'].map(
		(node: { '@type': string }) => node['@type'],
	);
	expect(types).toEqual(['TechArticle', 'BreadcrumbList']);
});

test('docs pages link to their neighbours and mark the current page', async ({
	page,
}) => {
	await page.goto('/components');

	await expect(
		page
			.getByRole('navigation', { name: 'Documentation' })
			.first()
			.getByRole('link', { name: 'Components' }),
	).toHaveAttribute('aria-current', 'page');
	await expect(
		page
			.getByRole('navigation', { name: 'More documentation' })
			.getByRole('link', { name: /Common schema types/ }),
	).toHaveAttribute('href', '/schema-types-content');
});

test('unknown pages are a 404', async ({ page }) => {
	const response = await page.goto('/not-a-page');

	expect(response?.status()).toBe(404);
});
