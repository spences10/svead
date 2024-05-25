<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		url: 'https://example.com/blog',
		title: 'Blog',
		description: 'This is a sample blog post.',
		open_graph_image:
			'https://example.com/images/blog-post-image.jpg',
		date_published: '2023-04-05T10:00:00Z',
		date_modified: '2023-04-05T12:00:00Z',
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

<h1>Blog Post Title</h1>
