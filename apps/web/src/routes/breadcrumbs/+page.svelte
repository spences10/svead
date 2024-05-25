<script lang="ts">
	import type { SeoConfig } from 'svead';
	import { Head } from 'svead';

	// Example data for the webpage
	const page_title = 'Sample Web Page';
	const page_description =
		'This is an example of a web page with enhanced SEO features.';
	const page_url = 'https://example.com/sample-page';
	const open_graph_image = 'https://example.com/images/og-image.jpg';

	const example_website_url = 'https://example.com';
	const example_image_url = 'https://example.com/image.jpg';
	const example_article_url = 'https://example.com/article';

	const seo_config: SeoConfig = {
		title: 'Example Page Title',
		description: 'This is an example description of the web page.',
		url: 'https://www.example.com/page-url',
		open_graph_image: 'https://www.example.com/og-image.jpg',
		language: 'en',

		// Add more properties as needed for your specific page
		author_name: 'Author Name',
		author_url: 'https://www.example.com/author',
		date_published: '2024-01-15',
		date_modified: '2024-01-16',
		publisher_name: 'Publisher Name',
		publisher_url: 'https://www.example.com/publisher',

		same_as: [
			'https://www.facebook.com/example',
			'https://www.twitter.com/example',
			// ... more social URLs
		],
		schema_org_article: {
			'@type': 'Article',
			'@id': 'https://www.example.com/article#article',
			isPartOf: { '@id': 'https://www.example.com' },
			author: { '@id': 'https://www.example.com/author#author' },
			headline: 'Example Article Headline',
			datePublished: '2024-01-15',
			dateModified: '2024-01-16',
			mainEntityOfPage: { '@id': 'https://www.example.com/article' },
			publisher: {
				'@id': 'https://www.example.com/publisher#publisher',
			},
			image: { '@id': 'https://www.example.com/image#image' },
			articleSection: ['News', 'Technology'],
			inLanguage: 'en',
		},
	};
</script>

<Head {seo_config} />

<h1>{page_title}</h1>
<p>{page_description}</p>
