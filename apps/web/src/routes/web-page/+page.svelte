<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		url: 'https://example.com/web-page',
		website: 'https://example.com',
		title: 'Sample Web Page',
		description:
			'This is an example of a simple web page showcasing the usage of the svead package for SEO optimization.',
		open_graph_image: 'https://example.com/images/web-page-image.jpg',
		date_published: '2023-06-03T09:00:00Z',
		date_modified: '2023-06-03T11:30:00Z',
		language: 'en',
		same_as: [
			'https://twitter.com/example',
			'https://www.facebook.com/example',
		],
		schema_org_webpage: {
			'@type': 'WebPage',
			'@id': 'https://example.com/web-page',
			url: 'https://example.com/web-page',
			name: 'Sample Web Page',
			description:
				'This is an example of a simple web page showcasing the usage of the svead package for SEO optimization.',
			inLanguage: 'en',
			isPartOf: {
				'@id': 'https://example.com',
			},
			breadcrumb: {
				'@id': 'https://example.com/web-page',
			},
			primaryImageOfPage: {
				'@id': 'https://example.com/images/web-page-image.jpg',
			},
			datePublished: '2023-06-03T09:00:00Z',
			dateModified: '2023-06-03T11:30:00Z',
			author: {
				'@id': 'https://example.com/author/john-doe',
			},
			potentialAction: [
				{
					'@type': 'ReadAction',
					target: ['https://example.com/web-page'],
				},
			],
		},
	};
</script>

<Head {seo_config} />

<main>
	<h1>Welcome to the Sample Web Page</h1>
	<p>
		This is a simple web page showcasing the usage of the svead
		package for SEO optimization.
	</p>
</main>
