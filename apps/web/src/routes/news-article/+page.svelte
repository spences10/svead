<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		url: 'https://example.com/news-article',
		title: 'News Article',
		description: 'This is a sample news article.',
		image: 'https://example.com/images/news-article-image.jpg',
		date_published: '2023-04-05T10:00:00Z',
		date_modified: '2023-04-05T12:00:00Z',
		main_entity: {
			name: 'News Article Title',
			url: 'https://example.com/news-article',
			description: 'This is a sample news article.',
			'@type': 'NewsArticle',
			headline: 'News Article Headline',
			image: 'https://example.com/images/news-article-image.jpg',
			author: {
				'@type': 'Person',
				name: 'John Smith',
				url: 'https://example.com/authors/john-smith',
			},
			publisher: {
				'@type': 'Organization',
				name: 'News Publisher', // Replace with your actual news publisher name
				url: 'https://example.com', // Replace with your actual news publisher URL
				logo: 'https://example.com/images/logo.png', // Replace with your actual news publisher logo
			},
			datePublished: '2023-04-05T10:00:00Z',
			dateModified: '2023-04-05T12:00:00Z',
		},
	};
</script>

<Head {seo_config} />
