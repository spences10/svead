import { render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Head from './head.svelte';

describe('Head', () => {
	afterEach(() => {
		document.head.innerHTML = '';
	});

	it('renders all required props correctly', async () => {
		// Rendering the component with hypothetical required props
		render(Head, {
			url: 'https://example.com',
			title: 'Test Title',
			description: 'Test Description',
			authorName: 'Test Author',
			image: 'https://example.com/test-image.jpg',
			paymentPointer: '$example.wallet/test',
		});

		// Querying elements based on what the component is expected to render
		const titleElement = document.head.querySelector('title');
		const descriptionElement = document.head.querySelector(
			'meta[name="description"]',
		);
		const authorElement = document.head.querySelector(
			'meta[name="author"]',
		);
		const ogImageElement = document.head.querySelector(
			'meta[property="og:image"]',
		);
		const twitterImageElement = document.head.querySelector(
			'meta[name="twitter:image"]',
		);
		const monetizationElement = document.head.querySelector(
			'meta[name="monetization"]',
		);

		// Assertions for each property based on expected behavior
		expect(titleElement?.textContent).toBe('Test Title');
		expect(descriptionElement?.getAttribute('content')).toBe(
			'Test Description',
		);
		expect(authorElement?.getAttribute('content')).toBe(
			'Test Author',
		);
		expect(ogImageElement?.getAttribute('content')).toBe(
			'https://example.com/test-image.jpg',
		);
		expect(twitterImageElement?.getAttribute('content')).toBe(
			'https://example.com/test-image.jpg',
		);
		expect(monetizationElement?.getAttribute('content')).toBe(
			'$example.wallet/test',
		);
	});

	it('renders the correct title, description, and author', async () => {
		render(Head, {
			url: 'https://example.com',
			title: 'Test Title',
			description: 'Test Description',
			authorName: 'Test Author',
		});

		const titleElement = document.head.querySelector('title');
		const descriptionElement = document.head.querySelector(
			'meta[name="description"]',
		);
		const authorElement = document.head.querySelector(
			'meta[name="author"]',
		);

		expect(titleElement?.textContent).toBe('Test Title');
		expect(descriptionElement?.getAttribute('content')).toBe(
			'Test Description',
		);
		expect(authorElement?.getAttribute('content')).toBe(
			'Test Author',
		);
	});

	it('renders the correct Open Graph and Twitter tags when an image is provided', async () => {
		render(Head, {
			url: 'https://example.com',
			title: 'Test Title',
			description: 'Test Description',
			image: 'https://example.com/test-image.jpg',
		});

		const ogImageElement = document.head.querySelector(
			'meta[property="og:image"]',
		);
		const twitterImageElement = document.head.querySelector(
			'meta[name="twitter:image"]',
		);

		expect(ogImageElement?.getAttribute('content')).toBe(
			'https://example.com/test-image.jpg',
		);
		expect(twitterImageElement?.getAttribute('content')).toBe(
			'https://example.com/test-image.jpg',
		);
	});

	it('renders the monetization tag when a payment pointer is provided', async () => {
		render(Head, {
			url: 'https://example.com',
			title: 'Test Title',
			description: 'Test Description',
			paymentPointer: '$example.wallet/test',
		});

		const monetizationElement = document.head.querySelector(
			'meta[name="monetization"]',
		);

		expect(monetizationElement?.getAttribute('content')).toBe(
			'$example.wallet/test',
		);
	});
});
