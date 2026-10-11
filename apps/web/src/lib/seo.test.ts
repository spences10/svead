import { describe, expect, it } from 'vitest';
import { page_for } from './docs/pages.js';
import {
	doc_schema,
	doc_seo,
	home_schema,
	home_seo,
	seo_config,
} from './seo.js';

const faq = page_for('faq')!;

describe('seo_config', () => {
	it('leaves the home title alone and adds the site name elsewhere', () => {
		expect(seo_config(home_seo).title).toBe(home_seo.title);
		expect(seo_config(doc_seo(faq)).title).toBe('FAQ | Svead');
	});

	it('builds URLs on the production origin', () => {
		expect(seo_config(home_seo).url).toBe('https://svead.pages.dev/');
		expect(seo_config(doc_seo(faq))).toMatchObject({
			url: 'https://svead.pages.dev/faq',
			website: 'svead.pages.dev',
			open_graph_image: 'https://svead.pages.dev/og/faq.png',
		});
	});
});

describe('structured data', () => {
	it('describes the site, the source and the docs on the home page', () => {
		const types = (home_schema() as Record<string, any>[]).map(
			(node) => node['@type'],
		);

		expect(types).toEqual([
			'WebSite',
			'SoftwareSourceCode',
			'ItemList',
		]);
	});

	it('ties a docs page to the site and gives it a trail', () => {
		const [website, article, trail] = doc_schema(faq) as Record<
			string,
			any
		>[];

		expect(article.isPartOf['@id']).toBe(website['@id']);
		expect(article.image).toBe('https://svead.pages.dev/og/faq.png');
		expect(
			trail.itemListElement.map(
				(crumb: { name: string; item: string }) => [
					crumb.name,
					crumb.item,
				],
			),
		).toEqual([
			['Home', 'https://svead.pages.dev/'],
			[
				'Best practices and help',
				'https://svead.pages.dev/#tap-help',
			],
			['FAQ', 'https://svead.pages.dev/faq'],
		]);
	});
});
