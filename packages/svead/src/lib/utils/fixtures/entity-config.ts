import type { SchemaOrgEntity } from '$lib/types/schema-org.js';

export const entity_config: SchemaOrgEntity = {
	'@type': ['Organization'],
	'@id': 'https://example.com',
	name: 'Example Entity',
	image: {
		'@type': 'ImageObject',
		'@id': 'https://example.com/entity-image.jpg',
		inLanguage: 'en',
		url: 'https://example.com/entity-image.jpg',
		contentUrl: 'https://example.com/entity-image.jpg',
		width: 800,
		height: 600,
		caption: 'Entity Image',
	},
	logo: {
		'@id': 'https://example.com/entity-logo.png',
	},
	sameAs: [
		'https://twitter.com/example',
		'https://facebook.com/example',
		'https://linkedin.com/company/example',
	],
};
