<script lang="ts">
  import { Details } from '$lib/components'
</script>

# Welcome to Svead 🍺

The Svelte Head and Schema.org Component.

Svead is a dynamic component that enhances your SEO by allowing you to
set head meta information for canonical, title, Twitter, Facebook,
Open Graph tags, and JSON-LD structured data.

Visit [GitHub](https://github.com/spences10/svead) to contribute to
this project.

## Documentation

### Getting Started

- **[Components](./components)** - Learn about the `Head` and `SchemaOrg` components
- **[Quick Reference](./quick-reference)** - Installation and basic usage

### Schema Types

- **[Common Schema Types](./schema-types-content)** - WebPage, BlogPosting, NewsArticle, Article, BreadcrumbList
- **[Specialty Schema Types](./schema-types-specialty)** - FAQ, Product, Recipe, Event, HowTo, Video, Course

### Advanced Usage

- **[Real-World Patterns](./real-world-patterns)** - Default configs, helper functions, and reusable patterns
- **[schema-dts Type Safety](./schema-dts)** - Leveraging TypeScript types for schema validation
- **[Advanced Patterns](./advanced-patterns)** - @graph, conditional spreading, mainEntity, potentialAction

### Best Practices & Help

- **[Best Practices](./best-practices)** - Tips for dates, images, validation, and more
- **[FAQ](./faq)** - Frequently asked questions
- **[Troubleshooting](./troubleshooting)** - Common issues and solutions

## Quick Example

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import {
		Head,
		SchemaOrg,
		type SeoConfig,
		type SchemaOrgProps,
	} from 'svead';

	const seo_config: SeoConfig = {
		title: 'My Blog Post',
		description: 'This is an example blog post using Svead.',
		url: page.url.href,
		author_name: 'John Doe',
		site_name: 'My Awesome Blog',
	};

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'BlogPosting',
		headline: seo_config.title,
		description: seo_config.description,
		author: {
			'@type': 'Person',
			name: seo_config.author_name,
		},
		datePublished: new Date().toISOString(),
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />

<article>
	<h1>{seo_config.title}</h1>
	<p>{seo_config.description}</p>
	<!-- Rest of your blog post content -->
</article>
```

## Example Routes

Explore how Svead works with different content types:

- [Breadcrumbs](/breadcrumbs)
- [Article](/article)
- [Blog Posting](/blog-posting)
- [News Article](/news-article)
- [Web Page](/web-page)
- [Multiple JSON-LD Sections](/multiple-ld-json-sections)

For more information and full documentation, visit the
[Svead GitHub repository](https://github.com/spences10/svead).
