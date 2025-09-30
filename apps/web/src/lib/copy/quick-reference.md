## Quick Reference

## Installation

```bash
pnpm add -D svead
```

## Basic Usage

```svelte
<script lang="ts">
	import { Head, SchemaOrg } from 'svead';
	import type { SeoConfig, SchemaOrgProps } from 'svead';

	const seo_config: SeoConfig = {
		title: 'Page Title',
		description: 'Page description',
		url: 'https://example.com',
	};

	const schema: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		name: 'Page Title',
	};
</script>

<Head {seo_config} />
<SchemaOrg {schema} />
```

## Common Patterns Cheatsheet

| Use Case         | Component   | Schema Type      |
| :--------------- | :---------- | :--------------- |
| Basic SEO        | `Head`      | N/A              |
| Blog Post        | Both        | `BlogPosting`    |
| Article          | Both        | `Article`        |
| News Article     | Both        | `NewsArticle`    |
| Product Page     | Both        | `Product`        |
| Recipe           | Both        | `Recipe`         |
| Event            | Both        | `Event`          |
| FAQ              | Both        | `FAQPage`        |
| Tutorial         | Both        | `HowTo`          |
| Video            | Both        | `VideoObject`    |
| Course           | Both        | `Course`         |
| Breadcrumbs Only | `SchemaOrg` | `BreadcrumbList` |

For more information and full documentation, visit the
[Svead GitHub repository](https://github.com/spences10/svead).
