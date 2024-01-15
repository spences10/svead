import { render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import type { SchemaOrgProps } from './schema-org-props.js';
import SchemaOrg from './schema-org.svelte';

const schema_org_props: SchemaOrgProps = {
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
		'@type': 'Article',
		name: 'Test Title',
		url: 'https://example.com',
		headline: 'Test Title',
		description: 'Test Description',
		image: 'https://example.com/test-image.jpg',
		datePublished: '2023-04-05T10:00:00Z',
		dateModified: '2023-04-05T12:00:00Z',
		author: {
			'@type': 'Person',
			name: 'Test Author',
			url: 'https://example.com/authors/test-author',
		},
		publisher: {
			'@type': 'Organization',
			name: 'https://example.com',
			logo: '',
		},
	},
	breadcrumbs: [],
};

const clean_html_content = (content: string): string => {
	return content.replace(/<!--[\s\S]*?-->/g, '');
};

describe('SchemaOrg', () => {
	afterEach(() => {
		document.head.innerHTML = '';
	});

	it('renders the correct JSON-LD script with the provided properties', async () => {
		const { container } = render(SchemaOrg, {
			schema_org_props: schema_org_props,
		});

		const jsonLdScriptElement = container.querySelector(
			'script[type="application/ld+json"]',
		);
		expect(jsonLdScriptElement).not.toBeNull();

		// Clean the innerHTML of the script tag by removing any HTML comments
		const cleanedInnerHtml = clean_html_content(
			jsonLdScriptElement!.innerHTML,
		);

		const jsonLdContent = JSON.parse(cleanedInnerHtml);

		expect(jsonLdContent['@context']).toBe('https://schema.org');
		expect(jsonLdContent.name).toBe('Test Title');
		expect(jsonLdContent.url).toBe('https://example.com');
		expect(jsonLdContent.headline).toBe('Test Title');
		expect(jsonLdContent.description).toBe('Test Description');
		expect(jsonLdContent.image).toBe(
			'https://example.com/test-image.jpg',
		);
		expect(jsonLdContent.datePublished).toBe('2023-04-05T10:00:00Z');
		expect(jsonLdContent.dateModified).toBe('2023-04-05T12:00:00Z');
		expect(jsonLdContent.inLanguage).toBe('en');
		expect(jsonLdContent.author['@type']).toBe('Person');
		expect(jsonLdContent.author.name).toBe('Test Author');
		expect(jsonLdContent.author.url).toBe(
			'https://example.com/authors/test-author',
		);
		expect(jsonLdContent.publisher['@type']).toBe('Organization');
		expect(jsonLdContent.publisher.name).toBe('');
		expect(jsonLdContent.publisher.logo).toBe(
			'https://example.com/test-image.jpg',
		);
		expect(jsonLdContent.mainEntityOfPage['@type']).toBe('WebPage');
		expect(jsonLdContent.mainEntityOfPage['@id']).toBe(
			'https://example.com',
		);
	});
});
