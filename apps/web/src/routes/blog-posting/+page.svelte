<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		url: 'https://example.com/blog/my-blog-post',
		title: 'My Blog Post',
		description:
			'This is an example blog post showcasing the usage of the svead package.',
		open_graph_image:
			'https://example.com/images/blog-post-image.jpg',
		date_published: '2023-06-01T10:00:00Z',
		date_modified: '2023-06-01T12:00:00Z',
		author_name: 'John Doe',
		author_url: 'https://example.com/author/john-doe',
		publisher_name: 'Example Blog',
		publisher_url: 'https://example.com',
		language: 'en',
		same_as: [
			'https://twitter.com/example',
			'https://www.facebook.com/example',
		],
		schema_org_article: {
			'@type': 'BlogPosting',
			'@id': 'https://example.com/blog/my-blog-post',
			isPartOf: {
				'@id': 'https://example.com/blog',
			},
			author: {
				'@id': 'https://example.com/author/john-doe',
			},
			headline: 'My Blog Post',
			datePublished: '2023-06-01T10:00:00Z',
			dateModified: '2023-06-01T12:00:00Z',
			mainEntityOfPage: {
				'@id': 'https://example.com/blog/my-blog-post',
			},
			publisher: {
				'@id': 'https://example.com',
			},
			image: {
				'@id': 'https://example.com/images/blog-post-image.jpg',
			},
			articleSection: ['Blogging', 'Web Development'],
			inLanguage: 'en',
		},
	};
</script>

<Head {seo_config} />

<article>
	<h1>My Blog Post</h1>
	<p>
		This is an example blog post showcasing the usage of the svead
		package.
	</p>
	<!-- Rest of your blog post content -->
</article>
