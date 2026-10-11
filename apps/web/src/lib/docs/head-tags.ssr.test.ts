import { Head, type SeoConfig } from 'svead';
import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import { head_tags, type HeadTag } from './head-tags.js';

const required: SeoConfig = {
	title: 'Mead on tap tonight',
	description: 'Six meads, two ciders and a guest ale.',
	url: 'https://example.com/',
};

const everything: SeoConfig = {
	...required,
	website: 'example.com',
	language: 'en_GB',
	open_graph_image: 'https://example.com/og.png',
	open_graph_image_alt: 'A pint of mead',
	payment_pointer: '$ilp.example.com/mead',
	author_name: 'Ada Brewer',
	site_name: 'The Mead Hall',
	twitter_handle: '@meadhall',
	twitter_card_type: 'summary',
};

/** What the real component renders on the server, in the same shape */
function rendered(config: SeoConfig): HeadTag[] {
	const { head } = render(Head, { props: { seo_config: config } });
	const elements = head.matchAll(
		/<(title|link|meta)\b([^>]*?)\/?>(?:([^<]*)<\/title>)?/g,
	);

	return [...elements].map(([, tag, attributes, text]) => ({
		tag: tag as HeadTag['tag'],
		attributes: [...attributes.matchAll(/([\w:-]+)="([^"]*)"/g)].map(
			([, name, value]): [string, string] => [name, value],
		),
		...(tag === 'title' ? { text } : {}),
	}));
}

// Svelte hoists <title>: the server writes it last, the browser keeps
// it first. head_tags leaves it where the component has it, so compare
// it apart from the rest, which is checked in order
function expect_same_head(config: SeoConfig) {
	const is_title = (tag: HeadTag) => tag.tag === 'title';
	const listed = head_tags(config);
	const real = rendered(config);

	expect(listed.filter((tag) => !is_title(tag))).toEqual(
		real.filter((tag) => !is_title(tag)),
	);
	expect(listed.filter(is_title)).toEqual(real.filter(is_title));
}

describe('head_tags', () => {
	it('lists what Head renders for the required options', () => {
		expect_same_head(required);
		expect(head_tags(required)).toHaveLength(13);
	});

	it('lists what Head renders with every option set', () => {
		expect_same_head(everything);
	});

	it('falls back to the title for the image alt text, as Head does', () => {
		const config = {
			...required,
			open_graph_image: 'https://example.com/og.png',
		};

		expect_same_head(config);
		expect(head_tags(config)).toContainEqual({
			tag: 'meta',
			attributes: [
				['property', 'og:image:alt'],
				['content', required.title],
			],
		});
	});
});
