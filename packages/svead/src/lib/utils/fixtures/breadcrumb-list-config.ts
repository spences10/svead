import type { SchemaOrgBreadcrumbList } from '$lib/types/schema-org.js';

export const breadcrumb_list_config: SchemaOrgBreadcrumbList = {
	'@type': 'BreadcrumbList',
	'@id': 'https://example.com/breadcrumb',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			item: {
				'@id': 'https://example.com',
				name: 'Home',
				url: 'https://example.com',
			},
		},
		{
			'@type': 'ListItem',
			position: 2,
			item: {
				'@id': 'https://example.com/category',
				name: 'Category',
				url: 'https://example.com/category',
			},
		},
		{
			'@type': 'ListItem',
			position: 3,
			item: {
				'@id': 'https://example.com/article',
				name: 'Article',
				url: 'https://example.com/article',
			},
		},
	],
};
