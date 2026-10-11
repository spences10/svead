import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import Page from './+page.svelte';

describe('home page SSR', () => {
	it('renders the head tags svead is for', () => {
		const { head } = render(Page);

		expect(head).toMatch(
			/<title>Svead: Svelte Head and Schema.org components<\/title>/,
		);
		expect(head).toMatch(/name="description"/);
		expect(head).toMatch(/property="og:title"/);
		expect(head).toContain(
			'property="og:image" content="https://svead.pages.dev/og/home.png"',
		);
		expect(head).toMatch(/name="twitter:card"/);
		expect(head).toMatch(/name="author" content="Scott Spence"/);
		expect(head).toMatch(
			/name="twitter:creator" content="@spences10"/,
		);
	});

	it('tells platforms the share card size up front', () => {
		const { head } = render(Page);

		expect(head).toContain(
			'property="og:image:width" content="1200"',
		);
		expect(head).toContain(
			'property="og:image:height" content="630"',
		);
		expect(head).toContain(
			'property="og:image:type" content="image/png"',
		);
	});

	it('uses the production origin for its URLs', () => {
		const { head } = render(Page);

		expect(head).toContain(
			'<link rel="canonical" href="https://svead.pages.dev/"',
		);
		expect(head).toContain(
			'property="og:url" content="https://svead.pages.dev/"',
		);
	});

	it('gives twitter:domain a host, not a URL', () => {
		const { head } = render(Page);

		expect(head).toContain(
			'property="twitter:domain" content="svead.pages.dev"',
		);
	});

	it('describes the site and its docs as structured data', () => {
		const { head } = render(Page);
		const json =
			/<script type="application\/ld\+json">(.*?)<\/script>/s.exec(
				head,
			)?.[1];
		const types = JSON.parse(json!)['@graph'].map(
			(node: { '@type': string }) => node['@type'],
		);

		expect(types).toEqual([
			'WebSite',
			'SoftwareSourceCode',
			'ItemList',
		]);
	});

	it('leaves no broken values in the head', () => {
		const { head } = render(Page);

		expect(head).not.toMatch(/undefined/);
		expect(head).not.toMatch(/\[object Object\]/);
		expect(head).not.toMatch(/content=""/);
	});

	it('renders the hero and the docs list', () => {
		const { body } = render(Page);

		expect(body).toContain('Put a proper');
		expect(body).toContain('&lt;Head');
		expect(body).toContain('On tap');
		expect(body).toContain('href="/quick-reference"');
	});
});
