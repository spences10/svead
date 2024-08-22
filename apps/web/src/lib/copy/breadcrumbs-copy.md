Here's the code for this page:

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import type { SchemaOrgProps, SeoConfig } from 'svead';
	import { Head, SchemaOrg } from 'svead';

	export let data;
	let { Copy } = data;

	// Example data for the webpage
	const page_title = 'Sample Web Page';
	const page_description =
		'This is an example of a web page with enhanced SEO features.';

	const seo_config: SeoConfig = {
		title: 'Example Page Title',
		description: 'This is an example description of the web page.',
		url: $page.url.href,
		website: 'https://www.example.com',
		open_graph_image: 'https://www.example.com/og-image.jpg',
		language: 'en',
		author_name: 'Author Name',
		twitter_handle: '@example',
		site_name: 'Example Site',
	};

	// Function to get current date in ISO format
	const get_current_iso_date = () => new Date().toISOString();

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		'@id': $page.url.href,
		url: $page.url.href,
		name: 'Example Page Title',
		description: 'This is an example description of the web page.',
		inLanguage: 'en',
		isPartOf: {
			'@id': 'https://www.example.com',
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
					item: 'https://www.example.com',
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: 'Category',
					item: 'https://www.example.com/category',
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: 'Example Page Title',
					item: $page.url.href,
				},
			],
		},
		primaryImageOfPage: {
			'@type': 'ImageObject',
			url: 'https://www.example.com/og-image.jpg',
		},
		datePublished: get_current_iso_date(),
		dateModified: get_current_iso_date(),
		author: {
			'@type': 'Person',
			name: 'Author Name',
			url: 'https://www.example.com/author',
		},
		potentialAction: [
			{
				'@type': 'ReadAction',
				target: $page.url.href,
			},
		],
		mainEntity: {
			'@type': 'Article',
			'@id': `${$page.url.href}#article`,
			isPartOf: {
				'@id': 'https://www.example.com',
			},
			author: {
				'@type': 'Person',
				name: 'Author Name',
				url: 'https://www.example.com/author',
			},
			headline: 'Example Article Headline',
			datePublished: get_current_iso_date(),
			dateModified: get_current_iso_date(),
			publisher: {
				'@type': 'Organization',
				name: 'Publisher Name',
				url: 'https://www.example.com/publisher',
			},
			image: {
				'@type': 'ImageObject',
				url: 'https://www.example.com/og-image.jpg',
			},
			articleSection: ['News', 'Technology'],
		},
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />

<h1>{page_title}</h1>
<p>{page_description}</p>

<Copy />
```
