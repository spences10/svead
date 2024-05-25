import type { SeoConfig } from '$lib/types/seo-config.js';
import { article_config } from './article-config.js';
import { breadcrumb_list_config } from './breadcrumb-list-config.js';
import { entity_config } from './entity-config.js';
import { image_object_config } from './image-object-config.js';
import { publisher_config } from './publisher-config.js';
import { webpage_config } from './webpage-config.js';
import { website_config } from './website-config.js';

export const base_config: SeoConfig = {
	title: 'Test Title',
	description: 'Test Description',
	url: 'https://example.com',
	website: 'https://example.com',
	language: 'en',
	open_graph_image: 'https://example.com/og-image.jpg',
	payment_pointer: '$example.wallet/test',
	author_name: 'John Doe',
	author_type: {
		'@type': 'Person',
		'@id': 'https://example.com/author',
		name: 'John Doe',
		url: 'https://example.com/author',
		image: {
			'@type': 'ImageObject',
			'@id': 'https://example.com/author-image.jpg',
			inLanguage: 'en',
			url: 'https://example.com/author-image.jpg',
			contentUrl: 'https://example.com/author-image.jpg',
			width: 800,
			height: 600,
			caption: 'Author Image',
		},
	},
	author_url: 'https://example.com/author',
	date_published: '2023-05-25',
	date_modified: '2023-05-25',
	publisher_name: 'Example Publisher',
	publisher_url: 'https://example.com/publisher',
	publisher_logo: 'https://example.com/publisher-logo.png',
	same_as: [
		'https://twitter.com/example',
		'https://facebook.com/example',
	],
	schema_org_search_url_template:
		'https://example.com/search?q={search_term_string}',
	schema_org_article: article_config,
	schema_org_website: website_config,
	schema_org_webpage: webpage_config,
	schema_org_entity: entity_config,
	schema_org_publisher: publisher_config,
	schema_org_image_object: image_object_config,
	schema_org_breadcrumb_list: breadcrumb_list_config,
};
