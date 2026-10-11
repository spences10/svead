import { expect, test } from '@playwright/test';

// Pages are prerendered, so they carry the production origin
const page_url = 'https://svead.pages.dev/';
const description =
	'Svead is a pair of Svelte components: Head sets the title, canonical, Open Graph and Twitter tags, and SchemaOrg adds JSON-LD structured data.';
const title = 'Svead: Svelte Head and Schema.org components';
const share_card = 'https://svead.pages.dev/og/home.png';

test.describe('home page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('names the component in its headline', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(
			/Put a proper <Head.\/> on every page\./,
		);
	});

	test('lists the docs', async ({ page }) => {
		await expect(
			page.getByRole('link', { name: /^Components Every option/ }),
		).toHaveAttribute('href', '/components');
	});

	test('rewrites the pint’s head as the config changes', async ({
		page,
	}) => {
		// The page is prerendered: wait for the app before typing
		await page.waitForLoadState('networkidle');
		const head = page.getByRole('list', {
			name: 'Tags Head renders for this config',
		});

		await page
			.getByRole('textbox', { name: 'title' })
			.fill('Honey & Hops');
		await expect(
			head.getByText('<title>Honey & Hops</title>'),
		).toBeVisible();

		await page
			.getByRole('checkbox', { name: 'author_name' })
			.check({ force: true });
		await expect(
			head.getByText('<meta name="author" content="Ada Brewer">'),
		).toBeVisible();
	});

	test.describe('meta tags', () => {
		test('head has canonical', async ({ page }) => {
			await expect(
				page.locator('link[rel="canonical"]'),
			).toHaveAttribute('href', page_url);
		});

		test('head has description', async ({ page }) => {
			await expect(
				page.locator('meta[name="description"]'),
			).toHaveAttribute('content', description);
		});

		test('has open graph title', async ({ page }) => {
			await expect(
				page.locator('meta[property="og:title"]'),
			).toHaveAttribute('content', title);
		});

		test('has open graph description', async ({ page }) => {
			await expect(
				page.locator('meta[property="og:description"]'),
			).toHaveAttribute('content', description);
		});

		test('has open graph image', async ({ page }) => {
			await expect(
				page.locator('meta[property="og:image"]'),
			).toHaveAttribute('content', share_card);
		});

		test('has open graph url', async ({ page }) => {
			await expect(
				page.locator('meta[property="og:url"]'),
			).toHaveAttribute('content', page_url);
		});

		test('has twitter card', async ({ page }) => {
			await expect(
				page.locator('meta[name="twitter:card"]'),
			).toHaveAttribute('content', 'summary_large_image');
		});

		test('has twitter title', async ({ page }) => {
			await expect(
				page.locator('meta[name="twitter:title"]'),
			).toHaveAttribute('content', title);
		});

		test('has twitter description', async ({ page }) => {
			await expect(
				page.locator('meta[name="twitter:description"]'),
			).toHaveAttribute('content', description);
		});

		test('has twitter image', async ({ page }) => {
			await expect(
				page.locator('meta[name="twitter:image"]'),
			).toHaveAttribute('content', share_card);
		});
	});
});

test('pages point at a share card that exists', async ({
	page,
	request,
}) => {
	for (const path of ['/', '/components', '/faq']) {
		await page.goto(path);
		const image = await page
			.locator('meta[property="og:image"]')
			.getAttribute('content');

		// The meta tag carries the production origin, the file is local
		const card = await request.get(new URL(image!).pathname);
		expect(card.status(), `${path} share card`).toBe(200);
		expect(card.headers()['content-type']).toBe('image/png');
	}
});
