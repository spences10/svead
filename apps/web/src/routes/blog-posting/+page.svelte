<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		url: 'https://example.com/blog',
		title: 'Blog',
		description: 'This is a sample blog post.',
		image: 'https://example.com/images/blog-post-image.jpg',
		date_published: '2023-04-05T10:00:00Z',
		date_modified: '2023-04-05T12:00:00Z',
		main_entity: {
			name: 'Blog Post Title',
			url: 'https://example.com/blog',
			description: 'This is a sample blog post.',
			'@type': 'BlogPosting',
			headline: 'Blog Post Headline',
			image: 'https://example.com/images/blog-post-image.jpg',
			author: {
				'@type': 'Person',
				name: 'Jane Doe',
				url: 'https://example.com/authors/jane-doe',
			},
			publisher: {
				'@type': 'Organization',
				name: 'Blog Publisher',
				url: 'https://example.com',
				logo: 'https://example.com/images/logo.png',
			},
			datePublished: '2023-04-05T10:00:00Z',
			dateModified: '2023-04-05T12:00:00Z',
		},
	};
</script>

<Head {seo_config} />

<h1>Blog Post Title</h1>
