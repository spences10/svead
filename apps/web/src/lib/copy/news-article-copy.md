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

	const seo_config: SeoConfig = {
		url: $page.url.href,
		website: 'https://example.com',
		title: 'Breaking News: Major Event Unfolds',
		description:
			'A significant event has taken place, impacting the lives of many. Read our latest news article for detailed coverage and analysis.',
		open_graph_image:
			'https://example.com/images/breaking-news-image.jpg',
		author_name: 'Jane Smith',
		language: 'en',
		twitter_handle: '@examplenews',
		site_name: 'Example News',
	};

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		'@id': $page.url.href,
		url: $page.url.href,
		name: seo_config.title,
		description: seo_config.description,
		inLanguage: seo_config.language,
		isPartOf: {
			'@type': 'WebSite',
			'@id': seo_config.website,
		},
		primaryImageOfPage: {
			'@type': 'ImageObject',
			url: seo_config.open_graph_image,
		},
		datePublished: '2023-06-02T09:30:00Z',
		dateModified: '2023-06-02T11:45:00Z',
		author: {
			'@type': 'Person',
			name: seo_config.author_name,
			url: `${seo_config.website}/author/jane-smith`,
		},
		publisher: {
			'@type': 'Organization',
			name: seo_config.site_name,
			url: seo_config.website,
			logo: {
				'@type': 'ImageObject',
				url: `${seo_config.website}/logo.png`,
			},
		},
		breadcrumb: {
			'@type': 'BreadcrumbList',
			'@id': `${$page.url.href}#breadcrumb`,
			name: 'Breadcrumb',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Home',
					item: seo_config.website,
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: 'News',
					item: `${seo_config.website}/news`,
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: seo_config.title,
					item: $page.url.href,
				},
			],
		},
		mainEntity: {
			'@type': 'NewsArticle',
			'@id': `${$page.url.href}#article`,
			headline: seo_config.title,
			description: seo_config.description,
			image: seo_config.open_graph_image,
			datePublished: '2023-06-02T09:30:00Z',
			dateModified: '2023-06-02T11:45:00Z',
			author: {
				'@type': 'Person',
				name: seo_config.author_name,
				url: `${seo_config.website}/author/jane-smith`,
			},
			publisher: {
				'@type': 'Organization',
				name: seo_config.site_name,
				url: seo_config.website,
				logo: {
					'@type': 'ImageObject',
					url: `${seo_config.website}/logo.png`,
				},
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': $page.url.href,
			},
			articleSection: ['News', 'Breaking News'],
			inLanguage: seo_config.language,
		},
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />

<article>
	<h1>{seo_config.title}</h1>
	<p>{seo_config.description}</p>
	<!-- Rest of your article content -->
	<Copy />
</article>
```
