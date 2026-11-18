import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import type { SeoConfig } from '../types/seo-config.js';
import Head from './head.svelte';

const required: SeoConfig = {
	title: 'Mead on tap tonight',
	description: 'Six meads, two ciders and a guest ale.',
	url: 'https://example.com/',
};

const image = 'https://example.com/og.png';

/** The `name` or `property` of each meta tag, in rendered order */
function meta_names(config: SeoConfig): string[] {
	const { head } = render(Head, { props: { seo_config: config } });
	return [...head.matchAll(/<meta (?:name|property)="([^"]+)"/g)].map(
		([, name]) => name,
	);
}

function content_of(config: SeoConfig, name: string) {
	const { head } = render(Head, { props: { seo_config: config } });
	return head.match(
		new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`),
	)?.[1];
}

describe('Head SSR share-card image tags', () => {
	it('renders the image type, dimensions and Twitter alt text', () => {
		const config: SeoConfig = {
			...required,
			open_graph_image: image,
			open_graph_image_alt: 'A pint of mead',
			open_graph_image_type: 'image/png',
			open_graph_image_width: 1200,
			open_graph_image_height: 630,
		};

		expect(content_of(config, 'og:image:type')).toBe('image/png');
		expect(content_of(config, 'og:image:width')).toBe('1200');
		expect(content_of(config, 'og:image:height')).toBe('630');
		expect(content_of(config, 'og:image:alt')).toBe('A pint of mead');
		expect(content_of(config, 'twitter:image:alt')).toBe(
			'A pint of mead',
		);
	});

	it('keeps the structured image properties straight after og:image', () => {
		const names = meta_names({
			...required,
			open_graph_image: image,
			open_graph_image_type: 'image/png',
			open_graph_image_width: 1200,
			open_graph_image_height: 630,
		});
		const start = names.indexOf('og:image');

		expect(names.slice(start, start + 5)).toEqual([
			'og:image',
			'og:image:type',
			'og:image:width',
			'og:image:height',
			'og:image:alt',
		]);
		expect(names.indexOf('twitter:image:alt')).toBe(
			names.indexOf('twitter:image') + 1,
		);
	});

	it('falls back to the title for the Twitter alt text', () => {
		const config = { ...required, open_graph_image: image };

		expect(content_of(config, 'twitter:image:alt')).toBe(
			required.title,
		);
	});

	it('leaves out the optional tags that are not set', () => {
		const names = meta_names({
			...required,
			open_graph_image: image,
			open_graph_image_width: 1200,
		});

		expect(names).toContain('og:image:width');
		expect(names).not.toContain('og:image:type');
		expect(names).not.toContain('og:image:height');
	});

	it('renders no image tags without an image', () => {
		const names = meta_names({
			...required,
			open_graph_image_alt: 'A pint of mead',
			open_graph_image_type: 'image/png',
			open_graph_image_width: 1200,
			open_graph_image_height: 630,
		});

		expect(names.filter((name) => name.includes('image'))).toEqual(
			[],
		);
	});
});
