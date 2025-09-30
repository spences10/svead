# Advanced Patterns

## Using @graph for Multiple Schemas

Combine multiple schema types using `@graph`:

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
		title: 'Advanced Page with Multiple Schemas',
		description: 'Example combining multiple schema types.',
	};

	// Create individual schema objects
	const blog_posting = {
		'@type': 'BlogPosting',
		'@id': $page.url.href,
		headline: seo_config.title,
		description: seo_config.description,
		datePublished: '2023-08-22T10:00:00Z',
		author: {
			'@type': 'Person',
			name: 'John Doe',
		},
	};

	const breadcrumb_list = {
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
				name: seo_config.title,
				item: $page.url.href,
			},
		],
	};

	// Combine using @graph
	const schema_org_config = {
		'@context': 'https://schema.org',
		'@graph': [blog_posting, breadcrumb_list],
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org_config} />
```

## Conditional Property Spreading

Use conditional spreading to include optional properties:

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const has_image = true;
	const open_graph_image = 'https://example.com/image.jpg';
	const website = 'https://example.com';

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		'@id': $page.url.href,
		name: 'Page Title',
		// Only include image if it exists
		...(has_image &&
			open_graph_image && {
				primaryImageOfPage: {
					'@type': 'ImageObject',
					url: open_graph_image,
				},
			}),
		// Conditionally add publisher
		...(website && {
			publisher: {
				'@type': 'Organization',
				name: 'Example Org',
				url: website,
			},
		}),
	};
</script>

<SchemaOrg schema={schema_org} />
```

## Multiple SchemaOrg Components

You can use multiple `SchemaOrg` components on the same page:

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const website_schema: SchemaOrgProps['schema'] = {
		'@type': 'WebSite',
		'@id': 'https://example.com',
		name: 'Example Site',
	};

	const article_schema: SchemaOrgProps['schema'] = {
		'@type': 'Article',
		'@id': 'https://example.com/article',
		headline: 'Article Title',
	};

	const breadcrumb_schema: SchemaOrgProps['schema'] = {
		'@type': 'BreadcrumbList',
		itemListElement: [
			/* ... */
		],
	};
</script>

<SchemaOrg schema={website_schema} />
<SchemaOrg schema={article_schema} />
<SchemaOrg schema={breadcrumb_schema} />
```

## WebPage as Container with mainEntity

Use WebPage as a wrapper with `mainEntity` to indicate what the page
is primarily about:

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
		description: 'An example blog post',
		author_name: 'John Doe',
	};

	// WebPage wraps the main content
	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		'@id': $page.url.href,
		url: $page.url.href,
		name: seo_config.title,
		description: seo_config.description,
		isPartOf: {
			'@type': 'WebSite',
			'@id': seo_config.website,
		},
		// The page is primarily about this BlogPosting
		mainEntity: {
			'@type': 'BlogPosting',
			'@id': `${$page.url.href}#article`,
			headline: seo_config.title,
			description: seo_config.description,
			datePublished: '2023-08-22T10:00:00Z',
			author: {
				'@type': 'Person',
				name: seo_config.author_name,
			},
			publisher: {
				'@type': 'Organization',
				name: 'Example Blog',
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': $page.url.href,
			},
		},
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />
```

This pattern is useful when you want to provide both page-level and
content-level metadata in a single schema object.

## Adding potentialAction for Interactivity

Use `potentialAction` to indicate actions users can perform on the
page:

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		'@id': $page.url.href,
		url: $page.url.href,
		name: 'Article Title',
		// Indicates this page can be read
		potentialAction: [
			{
				'@type': 'ReadAction',
				target: [$page.url.href],
			},
		],
	};
</script>

<SchemaOrg schema={schema_org} />
```

This helps with:

- Deep linking in mobile apps
- Progressive Web App integration
- Better understanding by search engines

**Common action types:**

- `ReadAction` - For articles, blogs, documentation
- `WatchAction` - For video content
- `ListenAction` - For podcasts, audio
- `SearchAction` - For search functionality

```typescript
// SearchAction example for site search
const search_action_schema = {
	'@type': 'WebSite',
	url: 'https://example.com',
	potentialAction: {
		'@type': 'SearchAction',
		target: {
			'@type': 'EntryPoint',
			urlTemplate:
				'https://example.com/search?q={search_term_string}',
		},
		'query-input': 'required name=search_term_string',
	},
};
```
