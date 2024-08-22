<script lang="ts">
	import { page } from '$app/stores';
	import {
		Head,
		SchemaOrg,
		type SchemaOrgProps,
		type SeoConfig,
	} from 'svead';

	const seo_config: SeoConfig = {
		url: $page.url.href,
		website: 'https://example.com',
		title: 'My Blog Post',
		description:
			'This is an example blog post showcasing the usage of the svead package.',
		open_graph_image:
			'https://example.com/images/blog-post-image.jpg',
		author_name: 'John Doe',
		language: 'en',
		twitter_handle: '@johndoe',
		site_name: 'Example Blog',
	};

	const schema: SchemaOrgProps = {
		schema: {
			'@type': 'BlogPosting',
			'@id': $page.url.href,
			'@context': 'https://schema.org',
			headline: 'My Blog Post',
			description:
				'This is an example blog post showcasing the usage of the svead package.',
			image: 'https://example.com/images/blog-post-image.jpg',
			datePublished: '2023-06-01T10:00:00Z',
			dateModified: '2023-06-01T12:00:00Z',
			author: {
				'@type': 'Person',
				name: 'John Doe',
				url: 'https://example.com/author/john-doe',
			},
			publisher: {
				'@type': 'Organization',
				name: 'Example Blog',
				url: 'https://example.com',
				logo: {
					'@type': 'ImageObject',
					url: 'https://example.com/logo.png',
				},
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': $page.url.href,
			},
			inLanguage: 'en',
		},
	};
</script>

<Head {seo_config} />
<SchemaOrg {schema} />

<article>
	<h1>My Blog Post</h1>
	<p>
		This is an example blog post showcasing the usage of the svead
		package.
	</p>
	<!-- Rest of your blog post content -->
</article>
