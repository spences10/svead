import { expect, test } from '@playwright/test';
let pageURL = 'http://localhost:4173/';

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
	expect(await page.textContent('h1')).toBe('Welcome to Svead');
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
			'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.',
		);
	});

	test('has open graph type', async ({ page }) => {
		const metaOgType = page.locator('meta[property="og:type"]');
		await expect(metaOgType.first()).toHaveAttribute(
			'content',
			'website',
		);
	});

	test('has open graph title', async ({ page }) => {
		const metaOgTitle = page.locator('meta[property="og:title"]');
		await expect(metaOgTitle.first()).toHaveAttribute(
			'content',
			'This is Svead a Svelte Head Component',
		);
	});

	test('has open graph description', async ({ page }) => {
		const metaOgDescription = page.locator(
			'meta[property="og:description"]',
		);
		await expect(metaOgDescription.first()).toHaveAttribute(
			'content',
			'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.',
		);
	});

	test('has open graph image', async ({ page }) => {
		const metaOgImage = page.locator('meta[property="og:image"]');
		await expect(metaOgImage.first()).toHaveAttribute(
			'content',
			'https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.vercel.app&footerTailwind=text-teal-600',
		);
	});

	test('has open graph twitter domain', async ({ page }) => {
		const metaTwitterDomain = page.locator(
			'meta[property="twitter:domain"]',
		);
		await expect(metaTwitterDomain.first()).toHaveAttribute(
			'content',
			'https://svead.vercel.app',
		);
	});

	test('has open graph twitter url', async ({ page }) => {
		const metaTwitterUrl = page.locator(
			'meta[property="twitter:url"]',
		);
		await expect(metaTwitterUrl.first()).toHaveAttribute(
			'content',
			pageURL,
		);
	});

	test('has open graph twitter title', async ({ page }) => {
		const metaTwitterTitle = page.locator(
			'meta[name="twitter:title"]',
		);
		await expect(metaTwitterTitle.first()).toHaveAttribute(
			'content',
			'This is Svead a Svelte Head Component',
		);
	});

	test('has open graph twitter description', async ({ page }) => {
		const metaTwitterDescription = page.locator(
			'meta[name="twitter:description"]',
		);
		await expect(metaTwitterDescription.first()).toHaveAttribute(
			'content',
			'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.',
		);
	});

	test('has open graph twitter image', async ({ page }) => {
		const metaTwitterImage = page.locator(
			'meta[name="twitter:image"]',
		);
		await expect(metaTwitterImage.first()).toHaveAttribute(
			'content',
			'https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.vercel.app&footerTailwind=text-teal-600',
		);
	});
});
