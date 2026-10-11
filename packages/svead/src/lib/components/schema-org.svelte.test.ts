import { afterEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import SchemaOrg from './schema-org.svelte';

function get_json_ld() {
	const script = document.head.querySelector(
		'script[type="application/ld+json"]',
	);
	expect(script).not.toBeNull();
	return JSON.parse(script?.textContent ?? '{}');
}

describe('SchemaOrg', async () => {
	afterEach(() => {
		document.head.innerHTML = '';
	});

	it('adds schema.org context to a single schema object', async () => {
		await render(SchemaOrg, {
			schema: {
				'@type': 'Article',
				headline: 'Structured data that works',
			},
		});

		expect(get_json_ld()).toEqual({
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: 'Structured data that works',
		});
	});

	it('preserves an explicit context on a single schema object', async () => {
		await render(SchemaOrg, {
			schema: {
				'@context': 'https://schema.org',
				'@type': 'Person',
				name: 'Grace Hopper',
			},
		});

		expect(get_json_ld()).toEqual({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Grace Hopper',
		});
	});

	it('renders multiple schema objects as a single @graph', async () => {
		await render(SchemaOrg, {
			schema: [
				{
					'@type': 'WebSite',
					name: 'Example',
				},
				{
					'@context': 'https://schema.org',
					'@type': 'WebPage',
					name: 'Home',
				},
			],
		});

		expect(get_json_ld()).toEqual({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'WebSite',
					name: 'Example',
				},
				{
					'@type': 'WebPage',
					name: 'Home',
				},
			],
		});
	});
});
