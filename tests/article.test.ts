// import { expect, test } from '@playwright/test'
// import { testSeoTags } from './utils'

// const pageURL = 'http://localhost:4173/'

// test.describe('Article page', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await page.goto('/article')
// 	})

// 	test('page has h1', async ({ page }) => {
// 		expect(await page.textContent('h1')).toBe('Article Example')
// 	})

// 	test('head has canonical', async ({ page }) => {
// 		await page.goto('/article')
// 		const metaDescription = page.locator('link[rel="canonical"]')
// 		await expect(metaDescription).toHaveAttribute(
// 			'href',
// 			'https://example.com/article'
// 		)
// 	})

// 	test('head has common SEO tags', async ({ page }) => {
// 		await testSeoTags(page, pageURL)
// 	})

// 	test('schema.org script is generated correctly', async ({
// 		page,
// 	}) => {
// 		await page.goto('/article')
// 		const jsonLdScriptElement = page.locator(
// 			'script[type="application/ld+json"]'
// 		)
// 		const jsonLdContent = await jsonLdScriptElement.textContent()
// 		if (jsonLdContent) {
// 			const expectedJsonLd = {
// 				'@context': 'https://schema.org',
// 				'@type': 'Article',
// 				author: {
// 					'@type': 'Person',
// 					name: 'John Doe',
// 					url: 'https://example.com/authors/john-doe',
// 				},
// 				dateModified: '2023-04-05T12:00:00Z',
// 				datePublished: '2023-04-05T10:00:00Z',
// 				description: 'This is a sample article.',
// 				headline: 'Article',
// 				image: 'https://example.com/images/article-image.jpg',
// 				name: 'Article',
// 				publisher: {
// 					'@type': 'Organization',
// 					logo: '',
// 					name: '',
// 				},
// 				url: 'https://example.com/article',
// 			}

// 			expect(JSON.parse(jsonLdContent)).toEqual(expectedJsonLd)
// 		}
// 	})

// 	test('schema.org script has the correct @type', async ({
// 		page,
// 	}) => {
// 		await page.goto('/article')
// 		const jsonLdScriptElement = page.locator(
// 			'script[type="application/ld+json"]'
// 		)
// 		const jsonLdContent = await jsonLdScriptElement.textContent()
// 		if (jsonLdContent) {
// 			const jsonLdData = JSON.parse(jsonLdContent)
// 			expect(jsonLdData['@type']).toBe('Article')
// 		}
// 	})

// 	test('schema.org script has the correct author data', async ({
// 		page,
// 	}) => {
// 		await page.goto('/article')
// 		const jsonLdScriptElement = page.locator(
// 			'script[type="application/ld+json"]'
// 		)
// 		const jsonLdContent = await jsonLdScriptElement.textContent()
// 		if (jsonLdContent) {
// 			const jsonLdData = JSON.parse(jsonLdContent)
// 			const authorData = jsonLdData.author
// 			expect(authorData).toEqual({
// 				'@type': 'Person',
// 				name: 'John Doe',
// 				url: 'https://example.com/authors/john-doe',
// 			})
// 		}
// 	})

// 	test('schema.org script has the correct publisher data', async ({
// 		page,
// 	}) => {
// 		await page.goto('/article')
// 		const jsonLdScriptElement = page.locator(
// 			'script[type="application/ld+json"]'
// 		)
// 		const jsonLdContent = await jsonLdScriptElement.textContent()
// 		if (jsonLdContent) {
// 			const jsonLdData = JSON.parse(jsonLdContent)
// 			const publisherData = jsonLdData.publisher
// 			expect(publisherData).toEqual({
// 				'@type': 'Organization',
// 				name: '',
// 				logo: '',
// 			})
// 		}
// 	})

// 	test('schema.org script has the correct datePublished and dateModified', async ({
// 		page,
// 	}) => {
// 		await page.goto('/article')
// 		const jsonLdScriptElement = page.locator(
// 			'script[type="application/ld+json"]'
// 		)
// 		const jsonLdContent = await jsonLdScriptElement.textContent()
// 		if (jsonLdContent) {
// 			const jsonLdData = JSON.parse(jsonLdContent)
// 			expect(jsonLdData.datePublished).toBe('2023-04-05T10:00:00Z')
// 			expect(jsonLdData.dateModified).toBe('2023-04-05T12:00:00Z')
// 		}
// 	})
// })
