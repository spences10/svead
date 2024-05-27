<script lang="ts">
	import type { SchemaOrgBreadcrumbList, SeoConfig } from 'svead';
	import { Head } from 'svead';

	// Reusable website configuration
	const website_config = {
		url: 'https://www.example.com',
		name: 'Example Website',
		description: 'This is an example website.',
		title: 'This is an example website.',
		language: 'en',
		author_name: 'Author Name',
		author_url: 'https://www.example.com/author',
		publisher_name: 'Publisher Name',
		publisher_url: 'https://www.example.com/publisher',
		same_as: [
			'https://www.facebook.com/example',
			'https://www.twitter.com/example',
		],
	} as SeoConfig;

	// Reusable breadcrumb list configuration
	const breadcrumb_list_config = [
		{
			'@type': 'ListItem',
			position: 1,
			item: {
				'@id': `${website_config.url}`,
				name: 'Home',
				url: `${website_config.url}`,
			},
		},
		{
			'@type': 'ListItem',
			position: 2,
			item: {
				'@id': `${website_config.url}/category`,
				name: 'Category',
				url: `${website_config.url}/category`,
			},
		},
	] as SchemaOrgBreadcrumbList['itemListElement'];

	// Example data for the webpage
	const page_title = 'Sample Web Page';
	const page_description =
		'This is an example of a web page with enhanced SEO features.';

	const seo_config: SeoConfig = {
		title: 'Example Page Title',
		description: 'This is an example description of the web page.',
		url: `${website_config.url}/page-url`,
		website: website_config.url,
		open_graph_image: `${website_config.url}/og-image.jpg`,
		language: website_config.language,
		author_name: website_config.author_name,
		author_url: website_config.author_url,
		date_published: '2024-01-15',
		date_modified: '2024-01-16',
		publisher_name: website_config.publisher_name,
		publisher_url: website_config.publisher_url,
		same_as: website_config.same_as,
		schema_org_article: {
			'@type': 'Article',
			'@id': `${website_config.url}/article`,
			isPartOf: {
				'@id': website_config.url,
			},
			author: {
				'@id': website_config.author_url || '',
			},
			headline: 'Example Article Headline',
			datePublished: '2024-01-15',
			dateModified: '2024-01-16',
			mainEntityOfPage: {
				'@id': `${website_config.url}/article`,
			},
			publisher: {
				'@id': website_config.publisher_url || '',
			},
			image: {
				'@id': `${website_config.url}/image`,
			},
			articleSection: ['News', 'Technology'],
			inLanguage: website_config.language || 'en',
		},
		schema_org_breadcrumb_list: {
			'@type': 'BreadcrumbList',
			'@id': `${website_config.url}/page-url`,
			itemListElement: [
				...breadcrumb_list_config,
				{
					'@type': 'ListItem',
					position: 3,
					item: {
						'@id': `${website_config.url}/page-url`,
						name: 'Example Page Title',
						url: `${website_config.url}/page-url`,
					},
				},
			],
		},
		schema_org_webpage: {
			'@type': 'WebPage',
			'@id': `${website_config.url}/page-url`,
			url: `${website_config.url}/page-url`,
			name: 'Example Page Title',
			description: 'This is an example description of the web page.',
			inLanguage: website_config.language || 'en',
			isPartOf: {
				'@id': website_config.url,
			},
			breadcrumb: {
				'@id': `${website_config.url}/page-url`,
			},
			primaryImageOfPage: {
				'@id': `${website_config.url}/image`,
			},
			datePublished: '2024-01-15',
			dateModified: '2024-01-16',
			author: {
				'@id': website_config.author_url || '',
			},
			potentialAction: [
				{
					'@type': 'ReadAction',
					target: [`${website_config.url}/page-url`],
				},
			],
		},
	};
</script>

<Head {seo_config} />

<h1>{page_title}</h1>
<p>{page_description}</p>
