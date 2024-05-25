import { render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

import Head from './head.svelte';

import type { SeoConfig } from '$lib/types/seo-config.js';
import { base_config } from '$lib/utils/fixtures/base-config.js';

const clean_html_content = (content: string): string => {
	return content.replace(/<!--[\s\S]*?-->/g, '');
};

describe('Head component tests', () => {
	afterEach(() => {
		document.head.innerHTML = '';
	});

	describe('Meta Tags', () => {
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
	});
	describe('SchemaOrg Component', () => {
		it('does not render the SchemaOrg component when any necessary properties are missing', async () => {
			const seo_config_without_schema_org: SeoConfig = {
				title: base_config.title,
				description: base_config.description,
				url: base_config.url,
				schema_org_search_url_template: undefined,
				schema_org_article: undefined,
				schema_org_website: undefined,
				schema_org_webpage: undefined,
				schema_org_entity: undefined,
				schema_org_publisher: undefined,
				schema_org_image_object: undefined,
				schema_org_breadcrumb_list: undefined,
			};

			render(Head, {
				seo_config: seo_config_without_schema_org,
			});

			const schema_org_script = document.head.querySelector(
				'script[type="application/ld+json"]',
			);

			expect(schema_org_script).toBeNull();
		});

		it('renders the SchemaOrg component when all necessary properties are provided', async () => {
			render(Head, { seo_config: base_config });

			const json_ld_script_element = document.head.querySelector(
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

		it('renders the correct JSON-LD breadcrumbs', async () => {
			render(Head, { seo_config: base_config });

			const json_ld_script_element = document.head.querySelector(
				'script[type="application/ld+json"]',
			);
			expect(json_ld_script_element).not.toBeNull();

			const json_ld_content = JSON.parse(
				clean_html_content(json_ld_script_element?.innerHTML || ''),
			);

			const breadcrumb_list_object = json_ld_content['@graph'].find(
				(obj: any) => obj['@type'] === 'BreadcrumbList',
			);
			expect(breadcrumb_list_object).toBeDefined();

			if (breadcrumb_list_object) {
				expect(breadcrumb_list_object['@type']).toBe(
					'BreadcrumbList',
				);
				expect(
					Array.isArray(breadcrumb_list_object.itemListElement),
				).toBeTruthy();

				breadcrumb_list_object.itemListElement.forEach(
					(element: any) => {
						expect(typeof element.position).toBe('number');
						expect(typeof element.item.name).toBe('string');
						expect(typeof element.item.url).toBe('string');
					},
				);
			}
		});

		it('renders the correct JSON-LD main entity', async () => {
			render(Head, { seo_config: base_config });

			const json_ld_script_element = document.querySelector(
				'script[type="application/ld+json"]',
			);
			expect(json_ld_script_element).not.toBeNull();

			const json_ld_content = JSON.parse(
				clean_html_content(json_ld_script_element!.innerHTML),
			);

			const article_object = json_ld_content['@graph'].find(
				(obj: any) => obj['@type'] === 'Article',
			);
			expect(article_object).toBeDefined();

			if (article_object) {
				expect(article_object['@type']).toBe('Article');
				expect(typeof article_object.headline).toBe('string');

				if (article_object.description !== undefined) {
					expect(typeof article_object.description).toBe('string');
				}

				expect(article_object.isPartOf).toBeDefined();
				expect(article_object.isPartOf['@id']).toBe(
					'https://example.com#webpage',
				);

				expect(article_object.author).toBeDefined();
				expect(article_object.author['@id']).toBe(
					'https://example.com/#/schema/person',
				);

				expect(article_object.publisher).toBeDefined();
				expect(article_object.publisher['@id']).toBe(
					'https://example.com/#/schema/person',
				);

				expect(article_object.image).toBeDefined();
				expect(article_object.image['@id']).toBe(
					'https://example.com#primaryimage',
				);

				expect(
					Array.isArray(article_object.articleSection),
				).toBeTruthy();
				expect(article_object.articleSection).toContain('blog');

				expect(typeof article_object.inLanguage).toBe('string');
				expect(article_object.inLanguage).toBe('en');

				expect(typeof article_object.datePublished).toBe('string');
				expect(typeof article_object.dateModified).toBe('string');
			}
		});

		it('renders the correct language in JSON-LD', async () => {
			render(Head, { seo_config: base_config });

			const json_ld_script_element = document.querySelector(
				'script[type="application/ld+json"]',
			);
			expect(json_ld_script_element).not.toBeNull();

			const json_ld_content = JSON.parse(
				clean_html_content(json_ld_script_element!.innerHTML),
			);

			const webSite_object = json_ld_content['@graph'].find(
				(obj: any) => obj['@type'] === 'WebSite',
			);
			expect(webSite_object).toBeDefined();
			if (webSite_object) {
				expect(webSite_object.inLanguage).toBe(base_config.language);
			}

			const article_object = json_ld_content['@graph'].find(
				(obj: any) => obj['@type'] === 'Article',
			);
			expect(article_object).toBeDefined();
			if (article_object) {
				expect(article_object.inLanguage).toBe(base_config.language);
			}
		});

		it('does not render breadcrumbs when not provided', async () => {
			const config = { ...base_config, breadcrumbs: undefined };
			render(Head, { seo_config: config });

			const json_ld_script_element = document.querySelector(
				'script[type="application/ld+json"]',
			);

			// Parse the JSON-LD content
			const json_ld_content = JSON.parse(
				clean_html_content(json_ld_script_element!.innerHTML),
			);

			// Check if the breadcrumbs property does not exist in the JSON-LD content
			expect(json_ld_content.breadcrumb).toBeUndefined();
		});
	});
});
