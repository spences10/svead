import type { SeoConfig } from '$lib/types.js';
import { render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Head from './head.svelte';

const base_config: SeoConfig = {
	url: 'https://example.com',
	title: 'Test Title',
	description: 'Test Description',
	website: 'https://example.com',
	author_name: 'Test Author',
	author_type: 'Person',
	author_url: 'https://example.com/author',
	open_graph_image: 'https://example.com/test-image.jpg',
	publisher_name: 'Test Publisher',
	publisher_url: 'https://example.com/publisher',
	publisher_logo: 'https://example.com/publisher-logo.png',
	date_published: '2024-01-07',
	date_modified: '2024-01-07',
	language: 'en',
	main_entity: {
		'@type': 'Article',
		name: 'Test Title',
		url: 'https://example.com',
		image: 'https://example.com/test-image.jpg',
		headline: 'Test Headline',
		description: 'Test Description',
		author: {
			'@type': 'Person',
			name: 'Test Author',
			url: 'https://example.com/author',
		},
		publisher: {
			'@type': 'Organization',
			name: 'Test Publisher',
			url: 'https://example.com/publisher',
			logo: 'https://example.com/publisher-logo.png',
		},
		datePublished: '2024-01-07',
		dateModified: '2024-01-07',
	},
	breadcrumbs: [
		{
			name: 'Home',
			url: 'https://example.com',
		},
		{
			name: 'Test Page',
			url: 'https://example.com/test-page',
		},
	],
};

const clean_html_content = (content: string): string => {
	return content.replace(/<!--[\s\S]*?-->/g, '');
};

describe('Head', () => {
	afterEach(() => {
		document.head.innerHTML = '';
	});

	it('renders the correct meta tags with the provided properties', async () => {
		// Rendering the component with base configuration
		render(Head, { seo_config: base_config });

		// Querying elements based on what the component is expected to render
		const title_element = document.head.querySelector('title');
		const description_element = document.head.querySelector(
			'meta[name="description"]',
		);
		const author_element = document.head.querySelector(
			'meta[name="author"]',
		);
		const og_image_element = document.head.querySelector(
			'meta[property="og:image"]',
		);
		const twitter_image_element = document.head.querySelector(
			'meta[name="twitter:image"]',
		);

		// Assertions for each property based on expected behavior
		expect(title_element?.textContent).toBe(base_config.title);
		expect(description_element?.getAttribute('content')).toBe(
			base_config.description,
		);
		expect(author_element?.getAttribute('content')).toBe(
			base_config.author_name,
		);
		expect(og_image_element?.getAttribute('content')).toBe(
			base_config.open_graph_image,
		);
		expect(twitter_image_element?.getAttribute('content')).toBe(
			base_config.open_graph_image,
		);
	});

	it('renders the correct title, description, and author', async () => {
		render(Head, {
			seo_config: {
				url: 'https://example.com',
				title: 'Test Title',
				description: 'Test Description',
				author_name: 'Test Author',
			},
		});

		const title_element = document.head.querySelector('title');
		const description_element = document.head.querySelector(
			'meta[name="description"]',
		);
		const author_element = document.head.querySelector(
			'meta[name="author"]',
		);

		expect(title_element?.textContent).toBe('Test Title');
		expect(description_element?.getAttribute('content')).toBe(
			'Test Description',
		);
		expect(author_element?.getAttribute('content')).toBe(
			'Test Author',
		);
	});

	it('renders the correct Open Graph and Twitter tags when an image is provided', async () => {
		render(Head, {
			seo_config: {
				url: 'https://example.com',
				title: 'Test Title',
				description: 'Test Description',
				open_graph_image: 'https://example.com/test-image.jpg',
			},
		});

		const og_image_element = document.head.querySelector(
			'meta[property="og:image"]',
		);
		const twitter_image_element = document.head.querySelector(
			'meta[name="twitter:image"]',
		);

		expect(og_image_element?.getAttribute('content')).toBe(
			'https://example.com/test-image.jpg',
		);
		expect(twitter_image_element?.getAttribute('content')).toBe(
			'https://example.com/test-image.jpg',
		);
	});

	it('renders the monetization tag when a payment pointer is provided', async () => {
		render(Head, {
			seo_config: {
				url: 'https://example.com',
				title: 'Test Title',
				description: 'Test Description',
				payment_pointer: '$example.wallet/test',
			},
		});

		const monetization_element = document.head.querySelector(
			'meta[name="monetization"]',
		);

		expect(monetization_element?.getAttribute('content')).toBe(
			'$example.wallet/test',
		);
	});

	it('does not render the SchemaOrg component when any necessary properties are missing', async () => {
		render(Head, {
			seo_config: { ...base_config, main_entity: undefined },
		});

		const schema_org_script = document.head.querySelector(
			'script[type="application/ld+json"]',
		);

		expect(schema_org_script).toBeNull();
	});

	it('renders the SchemaOrg component when all necessary properties are provided', async () => {
		const { container } = render(Head, { seo_config: base_config });

		const json_ld_script_element = container.querySelector(
			'script[type="application/ld+json"]',
		);
		expect(json_ld_script_element).not.toBeNull();

		// Clean the innerHTML of the script tag by removing any HTML comments
		const cleaned_inner_html = clean_html_content(
			json_ld_script_element!.innerHTML,
		);

		const json_ld_content = JSON.parse(cleaned_inner_html);

		expect(json_ld_content).not.toBeNull();
	});

	it('does not render the SchemaOrg component when any necessary properties are missing', async () => {
		render(Head, {
			seo_config: { ...base_config, main_entity: undefined },
		});

		const schema_org_script = document.head.querySelector(
			'script[type="application/ld+json"]',
		);

		expect(schema_org_script).toBeNull();
	});

	it('renders the correct JSON-LD breadcrumbs', async () => {
		render(Head, { seo_config: base_config });

		const json_ld_script_element = document.querySelector(
			'div script[type="application/ld+json"]',
		);

		// Check if the script element exists
		expect(json_ld_script_element).not.toBeNull();

		// Parse the JSON-LD content
		const json_ld_content = JSON.parse(
			clean_html_content(json_ld_script_element!.innerHTML),
		);

		// Check if the breadcrumbs property exists in the JSON-LD content
		expect(json_ld_content.breadcrumb['@type']).toBe(
			'BreadcrumbList',
		);

		// Check if the breadcrumbs property has the correct structure
		expect(
			Array.isArray(json_ld_content.breadcrumb.itemListElement),
		).toBeTruthy();
		json_ld_content.breadcrumb.itemListElement.forEach(
			(element: any) => {
				expect(typeof element.position).toBe('number');
				expect(typeof element.item.name).toBe('string');
				expect(typeof element.item.url).toBe('string');
			},
		);
	});

	it('renders the correct JSON-LD main entity', async () => {
		render(Head, { seo_config: base_config });

		const json_ld_script_element = document.querySelector(
			'div script[type="application/ld+json"]',
		);

		// Check if the script element exists
		expect(json_ld_script_element).not.toBeNull();

		// Parse the JSON-LD content
		const json_ld_content = JSON.parse(
			clean_html_content(json_ld_script_element!.innerHTML),
		);

		// Check if the main_entity property exists in the JSON-LD content
		expect(json_ld_content['@type']).toBe('Article');

		// Check if the main_entity property has the correct structure
		expect(typeof json_ld_content.headline).toBe('string');
		expect(typeof json_ld_content.description).toBe('string');
		expect(json_ld_content.author['@type']).toBe('Person');
		expect(typeof json_ld_content.publisher['@type']).toBe('string');
		expect(typeof json_ld_content.datePublished).toBe('string');
		expect(typeof json_ld_content.dateModified).toBe('string');
	});

	it('renders the correct language in JSON-LD', async () => {
		render(Head, { seo_config: base_config });

		const json_ld_script_element = document.querySelector(
			'div script[type="application/ld+json"]',
		);

		// Check if the script element exists
		expect(json_ld_script_element).not.toBeNull();

		// Parse the JSON-LD content
		const json_ld_content = JSON.parse(
			clean_html_content(json_ld_script_element!.innerHTML),
		);

		// Check if the language property exists in the JSON-LD content
		expect(json_ld_content['inLanguage']).toBe(base_config.language);
	});

	it('renders the correct payment pointer in JSON-LD', async () => {
		render(Head, { seo_config: base_config });

		const json_ld_script_element = document.querySelector(
			'div script[type="application/ld+json"]',
		);

		// Check if the script element exists
		expect(json_ld_script_element).not.toBeNull();

		// Parse the JSON-LD content
		const json_ld_content = JSON.parse(
			clean_html_content(json_ld_script_element!.innerHTML),
		);

		// Check if the payment pointer property exists in the JSON-LD content
		expect(json_ld_content['paymentAccepted']).toBe(
			base_config.payment_pointer,
		);
	});

	it('does not render breadcrumbs when not provided', async () => {
		const config = { ...base_config, breadcrumbs: undefined };
		render(Head, { seo_config: config });

		const json_ld_script_element = document.querySelector(
			'div script[type="application/ld+json"]',
		);

		// Parse the JSON-LD content
		const json_ld_content = JSON.parse(
			clean_html_content(json_ld_script_element!.innerHTML),
		);

		// Check if the breadcrumbs property does not exist in the JSON-LD content
		expect(json_ld_content.breadcrumb).toBeUndefined();
	});

	it('does not render payment pointer when not provided', async () => {
		const config = { ...base_config, payment_pointer: undefined };
		render(Head, { seo_config: config });

		const json_ld_script_element = document.querySelector(
			'div script[type="application/ld+json"]',
		);

		// Parse the JSON-LD content
		const json_ld_content = JSON.parse(
			clean_html_content(json_ld_script_element!.innerHTML),
		);

		// Check if the payment pointer property does not exist in the JSON-LD content
		expect(json_ld_content.paymentAccepted).toBeUndefined();
	});
});
