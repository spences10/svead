import { render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Head from './head.svelte';

describe('Head', () => {
	afterEach(() => {
		document.head.innerHTML = '';
	});

	it.skip('renders the correct title, description, and author', async () => {
		render(Head, {
			url: 'https://example.com',
			title: 'Test Title',
			description: 'Test Description',
			authorName: 'Test Author',
		});

		const titleElement = document.head.querySelector(
			'meta[name="title"]',
		);
		const descriptionElement = document.head.querySelector(
			'meta[name="description"]',
		);
		const authorElement = document.head.querySelector(
			'meta[name="author"]',
		);

		expect(titleElement?.getAttribute('content')).toBe('Test Title');
		expect(descriptionElement?.getAttribute('content')).toBe(
			'Test Description',
		);
		expect(authorElement?.getAttribute('content')).toBe(
			'Test Author',
		);
	});

	it.skip('renders the correct Open Graph and Twitter tags when an image is provided', async () => {
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

	it.skip('renders the monetization tag when a payment pointer is provided', async () => {
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
