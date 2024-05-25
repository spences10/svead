<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		url: 'https://example.com/article',
		title: 'Article',
		description: 'This is a sample article.',
		schema_org_article: {
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
		},
	};
</script>

<Head {seo_config} />

<h1>Article Example</h1>
