import { expect, test } from '@playwright/test'
let pageURL = 'http://localhost:4173/'

test('index page has h1', async ({ page }) => {
	await page.goto('/')
	expect(await page.textContent('h1')).toBe('Welcome to Svead')
})

test.describe('meta tags', () => {
	test('head has canonical', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator('link[rel="canonical"]')
		await expect(metaDescription).toHaveAttribute('href', pageURL)
	})

	test('head has description', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator('meta[name="description"]')
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.'
		)
	})

	test('has open graph type', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator('meta[property="og:type"]')
		await expect(metaDescription).toHaveAttribute(
			'content',
			'website'
		)
	})

	test('has open graph title', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator('meta[property="og:title"]')
		await expect(metaDescription).toHaveAttribute(
			'content',
			'This is Svead a Svelte Head Component'
		)
	})

	test('has open graph description', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator(
			'meta[property="og:description"]'
		)
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.'
		)
	})

	test('has open graph image', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator('meta[property="og:image"]')
		await expect(metaDescription).toHaveAttribute(
			'content',
			'https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.vercel.app&footerTailwind=text-teal-600'
		)
	})

	test('has open graph twitter domain', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator(
			'meta[property="twitter:domain"]'
		)
		await expect(metaDescription).toHaveAttribute(
			'content',
			'https://svead.vercel.app/'
		)
	})

	test('has open graph twitter url', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator(
			'meta[property="twitter:url"]'
		)
		await expect(metaDescription).toHaveAttribute('content', pageURL)
	})

	test('has open graph twitter title', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator('meta[name="twitter:title"]')
		await expect(metaDescription).toHaveAttribute(
			'content',
			'This is Svead a Svelte Head Component'
		)
	})

	test('has open graph twitter description', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator(
			'meta[name="twitter:description"]'
		)
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.'
		)
	})

	test('has open graph twitter image', async ({ page }) => {
		await page.goto('/')
		const metaDescription = page.locator('meta[name="twitter:image"]')
		await expect(metaDescription).toHaveAttribute(
			'content',
			'https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.vercel.app&footerTailwind=text-teal-600'
		)
	})
})
