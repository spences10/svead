# Frequently Asked Questions

## How do I add SEO to my SvelteKit site?

Install Svead and use the `Head` component:

```svelte
<script lang="ts">
	import { Head } from 'svead';

	const seo_config = {
		title: 'My Page',
		description: 'Page description',
		url: 'https://example.com',
	};
</script>

<Head {seo_config} />
```

## How do I add OpenGraph tags for social media?

The `Head` component automatically includes OpenGraph tags. Add an
image:

```typescript
const seo_config = {
	title: 'My Page',
	description: 'Page description',
	url: 'https://example.com',
	open_graph_image: 'https://example.com/og-image.jpg',
	open_graph_image_alt: 'Alt text for image',
};
```

## How do I implement rich snippets in SvelteKit?

Use the `SchemaOrg` component with appropriate schema types:

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const schema: SchemaOrgProps['schema'] = {
		'@type': 'BlogPosting',
		headline: 'Article Title',
		datePublished: '2023-08-22T10:00:00Z',
		author: {
			'@type': 'Person',
			name: 'Author Name',
		},
	};
</script>

<SchemaOrg {schema} />
```

## Can I use multiple schema types on one page?

Yes! Use `@graph` to combine multiple schemas:

```typescript
const schema_config = {
	'@context': 'https://schema.org',
	'@graph': [
		{ '@type': 'BlogPosting', headline: '...' },
		{ '@type': 'BreadcrumbList', itemListElement: [...] },
	],
};
```

Or use multiple `SchemaOrg` components.

## How do I add metadata to blog posts?

Use both `Head` and `SchemaOrg` components:

```svelte
<script lang="ts">
	import { Head, SchemaOrg } from 'svead';

	const seo_config = {
		title: 'Blog Post Title',
		description: 'Post description',
		url: 'https://example.com/blog/post',
		author_name: 'Author Name',
	};

	const schema = {
		'@type': 'BlogPosting',
		headline: seo_config.title,
		datePublished: '2023-08-22T10:00:00Z',
	};
</script>

<Head {seo_config} />
<SchemaOrg {schema} />
```

## What Schema.org types are supported?

All 800+ Schema.org types are supported via `schema-dts`. Common ones:

- `BlogPosting` - Blog posts
- `Article` / `NewsArticle` - Articles
- `WebPage` - General pages
- `Product` - Products
- `Recipe` - Recipes
- `Event` - Events
- `FAQPage` - FAQ pages
- `HowTo` - Tutorials
- `VideoObject` - Videos
- `Course` - Educational content

## How do I add Twitter Card metadata?

The `Head` component includes Twitter Cards automatically:

```typescript
const seo_config = {
	title: 'My Page',
	description: 'Description',
	url: 'https://example.com',
	open_graph_image: 'https://example.com/image.jpg',
	twitter_handle: '@yourusername',
	twitter_card_type: 'summary_large_image', // Default
};
```

## How do I set the canonical URL?

The `url` property in `SeoConfig` sets the canonical URL:

```typescript
const seo_config = {
	url: 'https://example.com/canonical-url', // This becomes canonical
	title: 'Page Title',
	description: 'Description',
};
```

## Can I use Svead with SvelteKit SSR?

Yes! Svead works perfectly with SvelteKit SSR. The `Head` component
uses `<svelte:head>` which renders on the server.

## How do I validate my structured data?

Use these tools:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- Browser DevTools: Inspect
  `<script type="application/ld+json">` tags

## Do I need both Head and SchemaOrg components?

No, they're independent:

- Use `Head` for meta tags (required for basic SEO)
- Use `SchemaOrg` for rich snippets (optional, but recommended)
- Use both for complete SEO coverage
