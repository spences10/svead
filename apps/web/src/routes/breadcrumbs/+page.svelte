<script lang="ts">
	import type { SeoConfig } from 'svead';
	import { Head } from 'svead';

	// Example data for the webpage
	const page_title = 'Sample Web Page';
	const page_description =
		'This is an example of a web page with enhanced SEO features.';

	const seo_config: SeoConfig = {
		title: 'Example Page Title',
		description: 'This is an example description of the web page.',
		url: 'https://www.example.com/page-url',
		open_graph_image: 'https://www.example.com/og-image.jpg',
		language: 'en',
		author_name: 'Author Name',
		author_url: 'https://www.example.com/author',
		date_published: '2024-01-15',
		date_modified: '2024-01-16',
		publisher_name: 'Publisher Name',
		publisher_url: 'https://www.example.com/publisher',
		same_as: [
			'https://www.facebook.com/example',
			'https://www.twitter.com/example',
		],
		schema_org_article: {
			'@type': 'Article',
			'@id': 'https://www.example.com/article',
			isPartOf: {
				'@id': 'https://www.example.com',
			},
			author: {
				'@id': 'https://www.example.com/author',
			},
			headline: 'Example Article Headline',
			datePublished: '2024-01-15',
			dateModified: '2024-01-16',
			mainEntityOfPage: {
				'@id': 'https://www.example.com/article',
			},
			publisher: {
				'@id': 'https://www.example.com/publisher',
			},
			image: {
				'@id': 'https://www.example.com/image',
			},
			articleSection: ['News', 'Technology'],
			inLanguage: 'en',
		},
		schema_org_breadcrumb_list: {
			'@type': 'BreadcrumbList',
			'@id': 'https://www.example.com/page-url',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					item: {
						'@id': 'https://www.example.com',
						name: 'Home',
						url: 'https://www.example.com',
					},
				},
				{
					'@type': 'ListItem',
					position: 2,
					item: {
						'@id': 'https://www.example.com/category',
						name: 'Category',
						url: 'https://www.example.com/category',
					},
				},
				{
					'@type': 'ListItem',
					position: 3,
					item: {
						'@id': 'https://www.example.com/page-url',
						name: 'Example Page Title',
						url: 'https://www.example.com/page-url',
					},
				},
			],
		},
		schema_org_webpage: {
			'@type': 'WebPage',
			'@id': 'https://www.example.com/page-url',
			url: 'https://www.example.com/page-url',
			name: 'Example Page Title',
			description: 'This is an example description of the web page.',
			inLanguage: 'en',
			isPartOf: {
				'@id': 'https://www.example.com',
			},
			breadcrumb: {
				'@id': 'https://www.example.com/page-url',
			},
			primaryImageOfPage: {
				'@id': 'https://www.example.com/image',
			},
			datePublished: '2024-01-15',
			dateModified: '2024-01-16',
			author: {
				'@id': 'https://www.example.com/author',
			},
			potentialAction: [
				{
					'@type': 'ReadAction',
					target: ['https://www.example.com/page-url'],
				},
			],
		},
	};
</script>

<Head {seo_config} />

<h1>{page_title}</h1>
<p>{page_description}</p>
