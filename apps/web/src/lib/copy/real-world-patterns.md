# Real-World Patterns

## Creating Default Configs and Helper Functions

For consistency across your site, create default configs and helper
functions:

```typescript
// lib/seo/default.ts
import type { SchemaOrgProps, SeoConfig } from 'svead';

export const default_seo_config: SeoConfig = {
	title: 'Default Page Title',
	description: 'Your site description',
	url: 'https://example.com',
	website: 'https://example.com',
	open_graph_image: 'https://example.com/og-image.jpg',
	language: 'en',
	author_name: 'Your Name',
	twitter_handle: '@youhandle',
	site_name: 'Your Site Name',
};

export const default_schema_org_config: SchemaOrgProps['schema'] = {
	'@type': 'WebSite',
	'@id': 'https://example.com',
	url: 'https://example.com',
	name: 'Your Site Name',
	description: 'Your site description',
	publisher: {
		'@type': 'Person',
		name: 'Your Name',
		url: 'https://example.com',
	},
};

// Helper to create page-specific configs
export const create_seo_config = (
	options: Partial<SeoConfig> & { slug?: string },
): SeoConfig => ({
	...default_seo_config,
	...options,
	title: options.title
		? `${options.title} - Your Site Name`
		: default_seo_config.title,
	url: options.slug
		? `https://example.com/${options.slug}`
		: default_seo_config.url,
});

// Helper to create schema configs
export const create_schema_org_config = (
	options: Partial<SchemaOrgProps['schema']>,
): SchemaOrgProps['schema'] => ({
	...default_schema_org_config,
	...options,
});
```

Then use them in your pages:

```svelte
<script lang="ts">
	import { Head } from 'svead';
	import { create_seo_config } from '$lib/seo/default';

	const seo_config = create_seo_config({
		title: 'About',
		description: 'About our site',
		slug: 'about',
	});
</script>

<Head {seo_config} />
```

## Pattern 1: Consistent Page Metadata

```typescript
// lib/info.ts
export const name = 'Your Name';
export const website = 'https://example.com';
export const description = 'Your site description';
export const language = 'en';

// Use everywhere
import { name, website, description } from '$lib/info';
```

## Pattern 2: Reusable Person Schema

```typescript
const person = {
	'@type': 'Person',
	name: 'Your Name',
	url: 'https://example.com',
	sameAs: [
		'https://twitter.com/youhandle',
		'https://github.com/yourusername',
		'https://linkedin.com/in/yourusername',
	],
};

// Use in multiple schemas
const article_schema = {
	'@type': 'Article',
	author: person,
};

const website_schema = {
	'@type': 'WebSite',
	publisher: person,
};
```

## Pattern 3: Dynamic OpenGraph Images

```typescript
// Generate dynamic OG images
const og_image_url = (title: string, site: string) => {
	return `https://og.example.com/api/og?title=${encodeURIComponent(title)}&site=${encodeURIComponent(site)}`;
};

const seo_config: SeoConfig = {
	title: 'My Page',
	description: 'Description',
	url: 'https://example.com',
	open_graph_image: og_image_url('My Page', 'example.com'),
};
```
