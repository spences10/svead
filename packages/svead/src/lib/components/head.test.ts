import { render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';
import Head from './head.svelte';

const clean_html_content = (content: string): string => {
	return content.replace(/<!--[\s\S]*?-->/g, '');
};

describe('Head component tests', () => {
	afterEach(() => {
		document.head.innerHTML = '';
	});

	describe('Basic Meta Tags', () => {
		it('renders canonical link correctly', async () => {
			const url = 'https://example.com';
			render(Head, {
				seo_config: {
					url,
					title: 'Test',
					description: 'Test description',
				},
			});
			const canonical = document.querySelector(
				'link[rel="canonical"]',
			);
			expect(canonical?.getAttribute('href')).toBe(url);
		});

		it('renders the correct title, description, and author', async () => {
			const config = {
				title: 'Test Title',
				description: 'Test Description',
				author_name: 'Test Author',
				url: 'https://example.com',
			};
			render(Head, { seo_config: config });

			expect(document.title).toBe(config.title);
			expect(
				document
					.querySelector('meta[name="description"]')
					?.getAttribute('content'),
			).toBe(config.description);
			expect(
				document
					.querySelector('meta[name="author"]')
					?.getAttribute('content'),
			).toBe(config.author_name);
		});

		it('renders the monetization tag when a payment pointer is provided', async () => {
			const payment_pointer = '$wallet.example.com/alice';
			render(Head, {
				seo_config: {
					title: 'Test',
					description: 'Test',
					url: 'https://example.com',
					payment_pointer,
				},
			});
			const monetization = document.querySelector(
				'meta[name="monetization"]',
			);
			expect(monetization?.getAttribute('content')).toBe(
				payment_pointer,
			);
		});
	});

	describe('Open Graph Protocol', () => {
		it('renders Open Graph tags correctly', async () => {
			const config = {
				title: 'OG Title',
				description: 'OG Description',
				url: 'https://example.com',
				open_graph_image: 'https://example.com/image.jpg',
				site_name: 'Example Site',
				language: 'en-US',
			};
			render(Head, { seo_config: config });

			expect(
				document
					.querySelector('meta[property="og:title"]')
					?.getAttribute('content'),
			).toBe(config.title);
			expect(
				document
					.querySelector('meta[property="og:description"]')
					?.getAttribute('content'),
			).toBe(config.description);
			expect(
				document
					.querySelector('meta[property="og:url"]')
					?.getAttribute('content'),
			).toBe(config.url);
			expect(
				document
					.querySelector('meta[property="og:image"]')
					?.getAttribute('content'),
			).toBe(config.open_graph_image);
			expect(
				document
					.querySelector('meta[property="og:site_name"]')
					?.getAttribute('content'),
			).toBe(config.site_name);
			expect(
				document
					.querySelector('meta[property="og:locale"]')
					?.getAttribute('content'),
			).toBe(config.language);
		});
	});

	describe('Twitter Card', () => {
		it('renders Twitter Card tags correctly', async () => {
			const config = {
				title: 'Twitter Title',
				description: 'Twitter Description',
				url: 'https://example.com',
				open_graph_image: 'https://example.com/image.jpg',
				website: 'example.com',
				twitter_handle: '@example',
				twitter_card_type: 'summary_large_image' as const,
			};
			render(Head, { seo_config: config });

			expect(
				document
					.querySelector('meta[name="twitter:title"]')
					?.getAttribute('content'),
			).toBe(config.title);
			expect(
				document
					.querySelector('meta[name="twitter:description"]')
					?.getAttribute('content'),
			).toBe(config.description);
			expect(
				document
					.querySelector('meta[name="twitter:image"]')
					?.getAttribute('content'),
			).toBe(config.open_graph_image);
			expect(
				document
					.querySelector('meta[property="twitter:domain"]')
					?.getAttribute('content'),
			).toBe(config.website);
			expect(
				document
					.querySelector('meta[name="twitter:creator"]')
					?.getAttribute('content'),
			).toBe(config.twitter_handle);
			expect(
				document
					.querySelector('meta[name="twitter:card"]')
					?.getAttribute('content'),
			).toBe(config.twitter_card_type);
		});
	});
});
