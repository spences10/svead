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

## Components

Svead provides two main components:

1. `Head`: For setting meta tags and other head information.
2. `SchemaOrg`: For adding structured data using JSON-LD.

## Head Component

### Usage

```svelte
<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		title: 'Welcome to My Site',
		description: 'This is a simple web page example.',
		url: 'https://example.com/welcome',
	};
</script>

<Head {seo_config} />
```

### `SeoConfig` Props

<Details buttonText="Click to expand">

| Property            | Type               | Description                                                  | Required |
| :------------------ | :----------------- | :----------------------------------------------------------- | :------- |
| `title`             | `string`           | The title of the web page.                                   | Yes      |
| `description`       | `string`           | A description of the web page.                               | Yes      |
| `url`               | `string`           | The URL of the web page.                                     | Yes      |
| `website`           | `string`           | The website the web page belongs to.                         | No       |
| `language`          | `string` \| `'en'` | The language of the web page. Defaults to 'en'.              | No       |
| `open_graph_image`  | `string`           | The URL of an image to use for Open Graph meta tags.         | No       |
| `payment_pointer`   | `string`           | A payment pointer for Web Monetization.                      | No       |
| `author_name`       | `string`           | The name of the author.                                      | No       |
| `site_name`         | `string`           | The name of the site for og:site_name.                       | No       |
| `twitter_handle`    | `string`           | The Twitter handle of the content creator or site.           | No       |
| `twitter_card_type` | `string`           | The type of Twitter card. Defaults to 'summary_large_image'. | No       |

</Details>

## SchemaOrg Component

### Usage

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'BlogPosting',
		headline: 'My First Blog Post',
		description: 'This is an example of a blog post using svead.',
		author: {
			'@type': 'Person',
			name: 'John Doe',
		},
		datePublished: '2023-08-22T10:00:00Z',
	};
</script>

<SchemaOrg schema={schema_org} />
```

### `SchemaOrgProps` Props

<Details buttonText="Click to expand">

| Property | Type            | Description                                                 | Required |
| :------- | :-------------- | :---------------------------------------------------------- | :------- |
| `schema` | `SchemaOrgType` | The structured data object following schema.org vocabulary. | Yes      |

</Details>

### `SchemaOrgType`

`SchemaOrgType` is extended from
[schema-dts](https://github.com/google/schema-dts) and is a union type
that includes:

- `Thing`: Represents the most generic type of item in schema.org.
- `WithContext<Thing>`: A Thing with an added `@context` property.

You can use any valid schema.org type as defined in the
[schema.org documentation](https://schema.org).

### Additional Notes:

- The `@context` property is automatically added by the component if
  not provided.
- You can include multiple schema types by nesting them within the
  main schema object.
- Always validate your structured data using tools like
  [Google's Rich Results Test](https://search.google.com/test/rich-results)
  to ensure it's correctly formatted.

## Example with Both Components

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
		title: 'My Blog Post',
		description: 'This is an example blog post using Svead.',
		url: $page.url.href,
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

This example demonstrates how to use both the `Head` and `SchemaOrg`
components together in a Svelte page, providing both meta tags and
structured data for improved SEO.

For more information and full documentation, visit the
[Svead GitHub repository](https://github.com/spences10/svead).
