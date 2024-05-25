import type { SchemaOrgWebsite } from '$lib/types/schema-org.js';

export const website_config: SchemaOrgWebsite = {
	'@type': 'WebSite',
	'@id': 'https://example.com',
	url: 'https://example.com',
	name: 'Example Website',
	description: 'Test Website Description',
	publisher: {
		'@id': 'https://example.com/publisher',
	},
	potentialAction: [
		{
			'@type': 'SearchAction',
			target: 'https://example.com/search?q={search_term_string}',
			'query-input': {
				'@type': 'PropertyValueSpecification',
				valueRequired: true,
				valueName: 'search_term_string',
			},
		},
	],
	inLanguage: 'en',
};
