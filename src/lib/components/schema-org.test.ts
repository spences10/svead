import { render } from '@testing-library/svelte'
import { afterEach, describe, expect, it } from 'vitest'
import SchemaOrg from './schema-org.svelte'

describe('SchemaOrg', () => {
	afterEach(() => {
		document.head.innerHTML = ''
	})

	it('renders the correct JSON-LD script with the provided properties', async () => {
		render(SchemaOrg, {
			schemaOrgProps: {
				url: 'https://example.com',
				title: 'Test Title',
				description: 'Test Description',
				authorName: 'Test Author',
				authorType: 'Person',
				authorUrl: 'https://example.com/authors/test-author',
				image: 'https://example.com/test-image.jpg',
				datePublished: '2023-04-05T10:00:00Z',
				dateModified: '2023-04-05T12:00:00Z',
				language: 'en',
				mainEntity: {
					type: 'Article',
					name: 'Test Title',
					url: 'https://example.com',
					headline: 'Test Title',
					description: 'Test Description',
					image: 'https://example.com/test-image.jpg',
					datePublished: '2023-04-05T10:00:00Z',
					dateModified: '2023-04-05T12:00:00Z',
					author: {
						type: 'Person',
						name: 'Test Author',
						url: 'https://example.com/authors/test-author',
					},
					publisher: {
						type: 'Organization',
						name: 'https://example.com',
						logo: '',
					},
				},
				breadcrumbs: [],
			},
		})

		const jsonLdScriptElement = document.head.querySelector(
			'script[type="application/ld+json"]'
		)

		if (!jsonLdScriptElement) {
			throw new Error('JSON-LD script element not found')
		}

		const jsonLdContent = JSON.parse(jsonLdScriptElement.innerHTML)

		expect(jsonLdContent['@type']).toBe('Article')
		expect(jsonLdContent.name).toBe('Test Title')
		expect(jsonLdContent.url).toBe('https://example.com')
		expect(jsonLdContent.headline).toBe('Test Title')
		expect(jsonLdContent.description).toBe('Test Description')
		expect(jsonLdContent.image).toBe(
			'https://example.com/test-image.jpg'
		)
		expect(jsonLdContent.datePublished).toBe('2023-04-05T10:00:00Z')
		expect(jsonLdContent.dateModified).toBe('2023-04-05T12:00:00Z')
		expect(jsonLdContent.author['@type']).toBe('Person')
		expect(jsonLdContent.author.name).toBe('Test Author')
		expect(jsonLdContent.author.url).toBe(
			'https://example.com/authors/test-author'
		)
		expect(jsonLdContent.publisher['@type']).toBe('Organization')
		expect(jsonLdContent.publisher.name).toBe('https://example.com')
		expect(jsonLdContent.publisher.logo).toBe('')
	})
})
