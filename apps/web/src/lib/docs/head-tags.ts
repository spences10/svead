import type { SeoConfig } from 'svead';

export interface HeadTag {
	tag: 'link' | 'meta' | 'title';
	attributes: [name: string, value: string][];
	/** What's between the tags, for `<title>` */
	text?: string;
}

const meta = (
	key: 'name' | 'property' | 'itemprop',
	name: string,
	content: string,
): HeadTag => ({
	tag: 'meta',
	attributes: [
		[key, name],
		['content', content],
	],
});

/**
 * The tags svead's `Head` renders for a config, in its order, for the
 * pint on the home page to show. A test renders the real component
 * with the same config and compares, so this can't drift from it.
 */
export function head_tags(config: SeoConfig): HeadTag[] {
	const image = config.open_graph_image;

	return [
		{
			tag: 'link',
			attributes: [
				['rel', 'canonical'],
				['href', config.url],
			],
		},
		{ tag: 'title', attributes: [], text: config.title },
		meta('name', 'title', config.title),
		meta('name', 'description', config.description),
		config.author_name && meta('name', 'author', config.author_name),
		meta('property', 'og:url', config.url),
		meta('property', 'og:type', 'website'),
		meta('property', 'og:title', config.title),
		meta('property', 'og:description', config.description),
		image && meta('property', 'og:image', image),
		image &&
			meta(
				'property',
				'og:image:alt',
				config.open_graph_image_alt || config.title,
			),
		config.site_name &&
			meta('property', 'og:site_name', config.site_name),
		meta(
			'name',
			'twitter:card',
			config.twitter_card_type || 'summary_large_image',
		),
		meta('name', 'twitter:title', config.title),
		meta('name', 'twitter:description', config.description),
		image && meta('name', 'twitter:image', image),
		config.twitter_handle &&
			meta('name', 'twitter:creator', config.twitter_handle),
		config.website &&
			meta('property', 'twitter:domain', config.website),
		config.website && meta('property', 'twitter:url', config.url),
		meta('itemprop', 'name', config.title),
		meta('itemprop', 'description', config.description),
		image && meta('itemprop', 'image', image),
		config.payment_pointer &&
			meta('name', 'monetization', config.payment_pointer),
		config.language && meta('property', 'og:locale', config.language),
	].filter((tag): tag is HeadTag => Boolean(tag));
}
