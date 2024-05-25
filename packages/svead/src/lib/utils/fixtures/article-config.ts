import type { SchemaOrgArticle } from '$lib/types/schema-org.js';

export const article_config: SchemaOrgArticle = {
	'@type': 'Article',
	'@id': 'https://example.com/article',
	isPartOf: {
		'@id': 'https://example.com',
	},
	author: {
		'@id': 'https://example.com/author',
	},
	headline: 'Test Article Headline',
	datePublished: '2023-05-25',
	dateModified: '2023-05-25',
	mainEntityOfPage: {
		'@id': 'https://example.com/article',
	},
	publisher: {
		'@id': 'https://example.com/publisher',
	},
	image: {
		'@id': 'https://example.com/article-image.jpg',
	},
	articleSection: ['News', 'Technology'],
	inLanguage: 'en',
};
