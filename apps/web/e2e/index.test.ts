import { expect, test } from '@playwright/test';
// Pages are prerendered, so they carry the production origin
let pageURL = 'https://svead.pages.dev/';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.afterEach(async ({ page }, testInfo) => {
	if (testInfo.status === 'failed') {
		await page.screenshot({
			path: `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`,
		});
	}
});

test('index page has h1', async ({ page }) => {
	await page.waitForSelector('h1');
	expect(await page.textContent('h1')).toBe(
		'Put a proper head on every page.',
	);
});

test.describe('meta tags', () => {
	test('head has canonical', async ({ page }) => {
		const metaCanonical = page.locator('link[rel="canonical"]');
		await expect(metaCanonical.first()).toHaveAttribute(
			'href',
			pageURL,
		);
	});

	test('head has description', async ({ page }) => {
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription.first()).toHaveAttribute(
			'content',
			'Svead is a pair of Svelte components: Head sets the title, canonical, Open Graph and Twitter tags, and SchemaOrg adds JSON-LD structured data.',
		);
	});

	test('has open graph title', async ({ page }) => {
		const metaOgTitle = page.locator('meta[property="og:title"]');
		await expect(metaOgTitle.first()).toHaveAttribute(
			'content',
			'Svead: Svelte Head and Schema.org components',
		);
	});

	test('has open graph description', async ({ page }) => {
		const metaOgDescription = page.locator(
			'meta[property="og:description"]',
		);
		await expect(metaOgDescription.first()).toHaveAttribute(
			'content',
			'Svead is a pair of Svelte components: Head sets the title, canonical, Open Graph and Twitter tags, and SchemaOrg adds JSON-LD structured data.',
		);
	});

	test('has open graph image', async ({ page }) => {
		const metaOgImage = page.locator('meta[property="og:image"]');
		await expect(metaOgImage.first()).toHaveAttribute(
			'content',
			'https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.pages.dev&footerTailwind=text-teal-600',
		);
	});

	test('has open graph url', async ({ page }) => {
		const metaOgUrl = page.locator('meta[property="og:url"]');
		await expect(metaOgUrl.first()).toHaveAttribute(
			'content',
			pageURL,
		);
	});

	test('has twitter card', async ({ page }) => {
		const metaTwitterCard = page.locator('meta[name="twitter:card"]');
		await expect(metaTwitterCard.first()).toHaveAttribute(
			'content',
			'summary_large_image',
		);
	});

	test('has twitter title', async ({ page }) => {
		const metaTwitterTitle = page.locator(
			'meta[name="twitter:title"]',
		);
		await expect(metaTwitterTitle.first()).toHaveAttribute(
			'content',
			'Svead: Svelte Head and Schema.org components',
		);
	});

	test('has twitter description', async ({ page }) => {
		const metaTwitterDescription = page.locator(
			'meta[name="twitter:description"]',
		);
		await expect(metaTwitterDescription.first()).toHaveAttribute(
			'content',
			'Svead is a pair of Svelte components: Head sets the title, canonical, Open Graph and Twitter tags, and SchemaOrg adds JSON-LD structured data.',
		);
	});

	test('has twitter image', async ({ page }) => {
		const metaTwitterImage = page.locator(
			'meta[name="twitter:image"]',
		);
		await expect(metaTwitterImage.first()).toHaveAttribute(
			'content',
			'https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.pages.dev&footerTailwind=text-teal-600',
		);
	});
});
