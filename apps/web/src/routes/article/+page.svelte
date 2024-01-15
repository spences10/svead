<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		url: 'https://example.com/article',
		title: 'Article',
		description: 'This is a sample article.',
		main_entity: {
			name: 'Article',
			url: 'https://example.com/article',
			description: 'This is a sample article.',
			'@type': 'Article',
			headline: 'Article Headline',
			image: 'https://example.com/images/article-image.jpg', // Added dummy image URL
			author: {
				'@type': 'Person',
				name: 'John Doe',
				url: 'https://example.com/authors/john-doe',
			},
			publisher: {
				'@type': 'Organization',
				name: 'Example Publisher',
				url: 'https://example.com',
				logo: 'https://example.com/images/logo.png',
			},
			datePublished: '2023-04-05T10:00:00Z',
			dateModified: '2023-04-05T12:00:00Z',
		},
	};
</script>

<Head {seo_config} />

<h1>Article Example</h1>
