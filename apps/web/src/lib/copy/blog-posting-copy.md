Here's the code for this page:

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import {
		Head,
		SchemaOrg,
		type SchemaOrgProps,
		type SeoConfig,
	} from 'svead';

	export let data;
	let { Copy } = data;

	const get_current_iso_date = () => new Date().toISOString();

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

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		'@id': $page.url.href,
		url: $page.url.href,
		name: seo_config.title,
		description: seo_config.description,
		inLanguage: seo_config.language,
		...(seo_config.website && {
			isPartOf: {
				'@type': 'WebSite',
				'@id': seo_config.website,
			},
		}),
		...(seo_config.open_graph_image && {
			primaryImageOfPage: {
				'@type': 'ImageObject',
				url: seo_config.open_graph_image,
			},
		}),
		datePublished: get_current_iso_date(),
		dateModified: get_current_iso_date(),
		author: {
			'@type': 'Person',
			name: seo_config.author_name,
			...(seo_config.website && {
				url: `${seo_config.website}/author/${seo_config.author_name?.toLowerCase().replace(' ', '-')}`,
			}),
		},
		potentialAction: [
			{
				'@type': 'ReadAction',
				target: $page.url.href,
			},
		],
		mainEntity: {
			'@type': 'BlogPosting',
			'@id': `${$page.url.href}#article`,
			headline: seo_config.title,
			description: seo_config.description,
			...(seo_config.open_graph_image && {
				image: seo_config.open_graph_image,
			}),
			datePublished: get_current_iso_date(),
			dateModified: get_current_iso_date(),
			author: {
				'@type': 'Person',
				name: seo_config.author_name,
				...(seo_config.website && {
					url: `${seo_config.website}/author/${seo_config.author_name?.toLowerCase().replace(' ', '-')}`,
				}),
			},
			publisher: {
				'@type': 'Organization',
				name: seo_config.site_name,
				...(seo_config.website && { url: seo_config.website }),
				...(seo_config.website && {
					logo: {
						'@type': 'ImageObject',
						url: `${seo_config.website}/logo.png`,
					},
				}),
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': $page.url.href,
			},
			inLanguage: seo_config.language,
		},
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />

<article>
	<h1>{seo_config.title}</h1>
	<p>{seo_config.description}</p>
	<!-- Rest of your blog post content -->
	<Copy />
</article>
```
