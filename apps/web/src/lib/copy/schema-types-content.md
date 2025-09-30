# Common Schema Types

## WebPage - Simple Page

For general web pages with breadcrumbs:

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import {
		Head,
		SchemaOrg,
		type SeoConfig,
		type SchemaOrgProps,
	} from 'svead';

	const seo_config: SeoConfig = {
		url: $page.url.href,
		website: 'https://example.com',
		title: 'Sample Web Page',
		description: 'This is an example of a simple web page.',
		open_graph_image: 'https://example.com/images/page-image.jpg',
		language: 'en',
		twitter_handle: '@example',
		site_name: 'Example Site',
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
		breadcrumb: {
			'@type': 'BreadcrumbList',
			'@id': `${$page.url.href}#breadcrumb`,
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
					name: seo_config.title,
					item: $page.url.href,
				},
			],
		},
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />
```

## BlogPosting - Blog Posts

For blog posts with full metadata:

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import {
		Head,
		SchemaOrg,
		type SeoConfig,
		type SchemaOrgProps,
	} from 'svead';

	const seo_config: SeoConfig = {
		url: $page.url.href,
		website: 'https://example.com',
		title: 'My Blog Post',
		description: 'This is an example blog post.',
		open_graph_image: 'https://example.com/images/blog-image.jpg',
		author_name: 'John Doe',
		language: 'en',
		twitter_handle: '@johndoe',
		site_name: 'Example Blog',
	};

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'BlogPosting',
		'@id': $page.url.href,
		url: $page.url.href,
		headline: seo_config.title,
		description: seo_config.description,
		image: seo_config.open_graph_image,
		datePublished: '2023-08-22T10:00:00Z',
		dateModified: '2023-08-22T10:00:00Z',
		author: {
			'@type': 'Person',
			name: seo_config.author_name,
			url: `${seo_config.website}/author/john-doe`,
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
		inLanguage: seo_config.language,
		keywords: ['SvelteKit', 'SEO', 'Blog'],
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />
```

## NewsArticle - News Content

For news articles with sections:

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import {
		Head,
		SchemaOrg,
		type SeoConfig,
		type SchemaOrgProps,
	} from 'svead';

	const seo_config: SeoConfig = {
		url: $page.url.href,
		website: 'https://example.com',
		title: 'Breaking News: Major Event',
		description: 'Detailed coverage and analysis of a major event.',
		open_graph_image: 'https://example.com/images/news-image.jpg',
		author_name: 'Jane Smith',
		language: 'en',
		twitter_handle: '@examplenews',
		site_name: 'Example News',
	};

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'NewsArticle',
		'@id': $page.url.href,
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
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />
```

## Article - General Articles

For general article content (parent type of BlogPosting and
NewsArticle):

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import {
		Head,
		SchemaOrg,
		type SeoConfig,
		type SchemaOrgProps,
	} from 'svead';

	const seo_config: SeoConfig = {
		url: $page.url.href,
		website: 'https://example.com',
		title: 'Understanding Schema.org',
		description: 'A comprehensive guide to Schema.org markup',
		open_graph_image: 'https://example.com/images/article-image.jpg',
		author_name: 'Jane Doe',
		language: 'en',
		site_name: 'Example Site',
	};

	const article_schema: SchemaOrgProps['schema'] = {
		'@type': 'Article',
		'@id': $page.url.href,
		headline: seo_config.title,
		description: seo_config.description,
		image: seo_config.open_graph_image,
		datePublished: '2023-08-22T10:00:00Z',
		dateModified: '2023-08-23T14:30:00Z',
		author: {
			'@type': 'Person',
			name: seo_config.author_name,
			url: `${seo_config.website}/author/jane-doe`,
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
		articleSection: ['Technology', 'Web Development'],
		inLanguage: seo_config.language,
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={article_schema} />
```

## BreadcrumbList - Standalone

Create breadcrumbs as a separate schema:

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const breadcrumb_schema: SchemaOrgProps['schema'] = {
		'@type': 'BreadcrumbList',
		'@id': `${$page.url.href}#breadcrumb`,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://example.com',
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Blog',
				item: 'https://example.com/blog',
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Current Page',
				item: $page.url.href,
			},
		],
	};
</script>

<SchemaOrg schema={breadcrumb_schema} />
```

**Multi-level breadcrumbs** (for deep page hierarchies):

```svelte
<script lang="ts">
	const multi_level_breadcrumbs: SchemaOrgProps['schema'] = {
		'@type': 'BreadcrumbList',
		'@id': `${$page.url.href}#breadcrumb`,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://example.com',
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Products',
				item: 'https://example.com/products',
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Electronics',
				item: 'https://example.com/products/electronics',
			},
			{
				'@type': 'ListItem',
				position: 4,
				name: 'Laptops',
				item: 'https://example.com/products/electronics/laptops',
			},
			{
				'@type': 'ListItem',
				position: 5,
				name: 'Gaming Laptops',
				item: $page.url.href,
			},
		],
	};
</script>
```

**HTML breadcrumb navigation** (combine with schema for best
results):

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const breadcrumbs = [
		{ name: 'Home', url: 'https://example.com' },
		{ name: 'Blog', url: 'https://example.com/blog' },
		{ name: 'Current Page', url: $page.url.href },
	];

	const breadcrumb_schema: SchemaOrgProps['schema'] = {
		'@type': 'BreadcrumbList',
		'@id': `${$page.url.href}#breadcrumb`,
		itemListElement: breadcrumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: crumb.url,
		})),
	};
</script>

<!-- Accessible HTML breadcrumbs -->
<nav aria-label="Breadcrumb">
	<ol class="breadcrumb">
		{#each breadcrumbs as crumb, index}
			<li>
				{#if index < breadcrumbs.length - 1}
					<a href={crumb.url}>{crumb.name}</a>
				{:else}
					<span aria-current="page">{crumb.name}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<!-- Schema markup -->
<SchemaOrg schema={breadcrumb_schema} />
```
