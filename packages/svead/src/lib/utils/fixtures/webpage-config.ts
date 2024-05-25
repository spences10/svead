import type { SchemaOrgWebPage } from '$lib/types/schema-org.js';

export const webpage_config: SchemaOrgWebPage = {
	'@type': 'WebPage',
	'@id': 'https://example.com/page',
	url: 'https://example.com/page',
	name: 'Example Web Page',
	isPartOf: {
		'@id': 'https://example.com',
	},
	primaryImageOfPage: {
		'@id': 'https://example.com/page-image.jpg',
	},
	datePublished: '2023-05-25',
	dateModified: '2023-05-25',
	author: {
		'@id': 'https://example.com/author',
	},
	description: 'Test Web Page Description',
	breadcrumb: {
		'@id': 'https://example.com/breadcrumb',
	},
	inLanguage: 'en',
	potentialAction: [
		{
			'@type': 'ReadAction',
			target: ['https://example.com/page'],
		},
	],
};
