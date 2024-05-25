import type { SchemaOrgPublisher } from '$lib/types/schema-org.js';

export const publisher_config: SchemaOrgPublisher = {
	'@type': ['Organization'],
	'@id': 'https://example.com/publisher',
	name: 'Example Publisher',
	image: {
		'@type': 'ImageObject',
		'@id': 'https://example.com/publisher-image.jpg',
		inLanguage: 'en',
		url: 'https://example.com/publisher-image.jpg',
		contentUrl: 'https://example.com/publisher-image.jpg',
		width: 800,
		height: 600,
		caption: 'Publisher Image',
	},
	logo: {
		'@id': 'https://example.com/publisher-logo.png',
	},
	sameAs: [
		'https://twitter.com/examplepublisher',
		'https://facebook.com/examplepublisher',
	],
};
