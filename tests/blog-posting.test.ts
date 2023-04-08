import { expect, test } from '@playwright/test'

test.describe('Blog Posting page', () => {
	let pageURL: string

	test.beforeEach(async ({ page }) => {
		pageURL = 'https://example.com/blog-post'
	})

	test('page has h1', async ({ page }) => {
		await page.goto(pageURL)
		const h1Element = page.locator('h1')
		await expect(h1Element).toHaveText('Blog Post Title')
	})

	test('head has canonical', async ({ page }) => {
		await page.goto(pageURL)
		const metaDescription = page.locator('link[rel="canonical"]')
		await expect(metaDescription).toHaveAttribute('href', pageURL)
	})

	test('schema.org script is generated correctly', async ({
		page,
	}) => {
		await page.goto(pageURL)
		const jsonLdScriptElement = page.locator(
			'script[type="application/ld+json"]'
		)
		const jsonLdContent = await jsonLdScriptElement.textContent()
		if (jsonLdContent) {
			const expectedJsonLd = {
				'@context': 'https://schema.org',
				'@type': 'BlogPosting',
				// Add the expected JSON-LD properties for your blog posting page here
			}
			expect(JSON.parse(jsonLdContent)).toEqual(expectedJsonLd)
		}
	})

	// Add more tests as needed for your specific blog posting page
})
