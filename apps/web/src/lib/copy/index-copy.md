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

## Example Routes

Explore how Svead works with different content types:

- [Breadcrumbs](/breadcrumbs)
- [Article](/article)
- [Blog Posting](/blog-posting)
- [News Article](/news-article)
- [Web Page](/web-page)
- [Multiple JSON-LD Sections](/multiple-ld-json-sections)

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

## Real-World Patterns

### Creating Default Configs and Helper Functions

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

## Common Schema Types

### WebPage - Simple Page

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

### BlogPosting - Blog Posts

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

### NewsArticle - News Content

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

### BreadcrumbList - Standalone

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

## More Schema Types

### FAQ Page - Frequently Asked Questions

For FAQ pages with question/answer pairs:

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const faq_schema: SchemaOrgProps['schema'] = {
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'What is Svead?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Svead is a Svelte component for managing SEO meta tags and structured data.',
				},
			},
			{
				'@type': 'Question',
				name: 'How do I install Svead?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Install with: pnpm add -D svead',
				},
			},
		],
	};
</script>

<SchemaOrg schema={faq_schema} />
```

### Product - E-commerce Product Pages

For product pages with pricing and reviews:

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const product_schema: SchemaOrgProps['schema'] = {
		'@type': 'Product',
		name: 'Product Name',
		image: 'https://example.com/product-image.jpg',
		description: 'Product description here',
		brand: {
			'@type': 'Brand',
			name: 'Brand Name',
		},
		offers: {
			'@type': 'Offer',
			url: 'https://example.com/product',
			priceCurrency: 'USD',
			price: '29.99',
			availability: 'https://schema.org/InStock',
			seller: {
				'@type': 'Organization',
				name: 'Example Store',
			},
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.5',
			reviewCount: '24',
		},
	};
</script>

<SchemaOrg schema={product_schema} />
```

### Recipe - Recipe Pages

For recipe and food content:

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const recipe_schema: SchemaOrgProps['schema'] = {
		'@type': 'Recipe',
		name: 'Chocolate Chip Cookies',
		image: 'https://example.com/cookie-image.jpg',
		description: 'Classic chocolate chip cookie recipe',
		author: {
			'@type': 'Person',
			name: 'Chef Name',
		},
		datePublished: '2023-08-22',
		prepTime: 'PT15M',
		cookTime: 'PT12M',
		totalTime: 'PT27M',
		recipeYield: '24 cookies',
		recipeIngredient: [
			'2 cups flour',
			'1 cup butter',
			'1 cup chocolate chips',
		],
		recipeInstructions: [
			{
				'@type': 'HowToStep',
				text: 'Preheat oven to 350°F',
			},
			{
				'@type': 'HowToStep',
				text: 'Mix ingredients',
			},
		],
		nutrition: {
			'@type': 'NutritionInformation',
			calories: '150 calories',
		},
	};
</script>

<SchemaOrg schema={recipe_schema} />
```

### Event - Events and Conferences

For event pages:

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const event_schema: SchemaOrgProps['schema'] = {
		'@type': 'Event',
		name: 'Conference Name 2024',
		description: 'Annual web development conference',
		startDate: '2024-09-15T09:00:00-05:00',
		endDate: '2024-09-17T17:00:00-05:00',
		eventStatus: 'https://schema.org/EventScheduled',
		eventAttendanceMode:
			'https://schema.org/OfflineEventAttendanceMode',
		location: {
			'@type': 'Place',
			name: 'Convention Center',
			address: {
				'@type': 'PostalAddress',
				streetAddress: '123 Main St',
				addressLocality: 'City',
				addressRegion: 'ST',
				postalCode: '12345',
				addressCountry: 'US',
			},
		},
		offers: {
			'@type': 'Offer',
			url: 'https://example.com/tickets',
			price: '299',
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock',
			validFrom: '2023-12-01T00:00:00',
		},
		organizer: {
			'@type': 'Organization',
			name: 'Event Organizer',
			url: 'https://example.com',
		},
	};
</script>

<SchemaOrg schema={event_schema} />
```

### HowTo - Tutorial and Guide Pages

For how-to guides and tutorials:

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const howto_schema: SchemaOrgProps['schema'] = {
		'@type': 'HowTo',
		name: 'How to Install Svead',
		description: 'Step-by-step guide to install Svead in SvelteKit',
		image: 'https://example.com/tutorial-image.jpg',
		totalTime: 'PT5M',
		tool: [
			{
				'@type': 'HowToTool',
				name: 'Terminal',
			},
		],
		step: [
			{
				'@type': 'HowToStep',
				name: 'Install Package',
				text: 'Run: pnpm add -D svead',
			},
			{
				'@type': 'HowToStep',
				name: 'Import Component',
				text: 'Import Head and SchemaOrg from svead',
			},
			{
				'@type': 'HowToStep',
				name: 'Configure',
				text: 'Add configuration object',
			},
		],
	};
</script>

<SchemaOrg schema={howto_schema} />
```

### Video - Video Content

For video content pages:

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const video_schema: SchemaOrgProps['schema'] = {
		'@type': 'VideoObject',
		name: 'Video Title',
		description: 'Video description',
		thumbnailUrl: 'https://example.com/thumbnail.jpg',
		uploadDate: '2023-08-22T08:00:00Z',
		duration: 'PT1M30S',
		contentUrl: 'https://example.com/video.mp4',
		embedUrl: 'https://example.com/embed/video',
	};
</script>

<SchemaOrg schema={video_schema} />
```

### Course - Educational Content

For online courses and educational content:

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const course_schema: SchemaOrgProps['schema'] = {
		'@type': 'Course',
		name: 'Learn SvelteKit',
		description: 'Comprehensive SvelteKit course',
		provider: {
			'@type': 'Organization',
			name: 'Education Platform',
			url: 'https://example.com',
		},
		offers: {
			'@type': 'Offer',
			category: 'Paid',
			price: '99',
			priceCurrency: 'USD',
		},
		hasCourseInstance: {
			'@type': 'CourseInstance',
			courseMode: 'online',
			courseWorkload: 'PT20H',
		},
	};
</script>

<SchemaOrg schema={course_schema} />
```

## Advanced Patterns

### Using @graph for Multiple Schemas

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

### Conditional Property Spreading

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

### Multiple SchemaOrg Components

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

## Tips & Best Practices

### Date Formatting

Always use ISO 8601 format for dates:

```typescript
// Good - ISO format
const date = new Date().toISOString(); // "2023-08-22T10:00:00.000Z"
const formatted = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"); // "2023-08-22T10:00:00+00:00"

// Use in schema
const schema = {
	'@type': 'BlogPosting',
	datePublished: date,
	dateModified: date,
};
```

### Image Properties

Include alt text for Open Graph images:

```typescript
const seo_config: SeoConfig = {
	title: 'Page Title',
	description: 'Page description',
	url: 'https://example.com',
	open_graph_image: 'https://example.com/image.jpg',
	open_graph_image_alt: 'Descriptive alt text for the image',
};
```

### Validation

Always validate your structured data:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- Use browser DevTools to inspect `<script type="application/ld+json">`
  tags

### Type Safety

Use TypeScript for type safety:

```typescript
import type { SeoConfig, SchemaOrgProps } from 'svead';

// TypeScript will catch errors
const seo_config: SeoConfig = {
	title: 'Required',
	description: 'Required',
	url: 'Required',
	// Optional properties have autocomplete
	open_graph_image: '...',
};

// Schema types from schema-dts
const schema: SchemaOrgProps['schema'] = {
	'@type': 'BlogPosting', // Autocomplete available
	headline: '...',
	// TypeScript validates properties
};
```

### Default Language

The language defaults to `'en'`, but specify it explicitly for
clarity:

```typescript
const seo_config: SeoConfig = {
	title: 'Page Title',
	description: 'Description',
	url: 'https://example.com',
	language: 'en', // Explicit is better
};
```

### Twitter Card Types

Choose the right Twitter card type:

```typescript
const seo_config: SeoConfig = {
	// ...
	twitter_card_type: 'summary_large_image', // Default, best for most content
	// twitter_card_type: 'summary', // Smaller image
	// twitter_card_type: 'player', // For video/audio
	// twitter_card_type: 'app', // For mobile apps
};
```

### Web Monetization

Add payment pointer for Web Monetization:

```typescript
const seo_config: SeoConfig = {
	title: 'Page Title',
	description: 'Description',
	url: 'https://example.com',
	payment_pointer: '$ilp.uphold.com/your-payment-pointer',
};
```

## Common Patterns from Real Projects

### Pattern 1: Consistent Page Metadata

```typescript
// lib/info.ts
export const name = 'Your Name';
export const website = 'https://example.com';
export const description = 'Your site description';
export const language = 'en';

// Use everywhere
import { name, website, description } from '$lib/info';
```

### Pattern 2: Reusable Person Schema

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

### Pattern 3: Dynamic OpenGraph Images

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

## Frequently Asked Questions

### How do I add SEO to my SvelteKit site?

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

### How do I add OpenGraph tags for social media?

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

### How do I implement rich snippets in SvelteKit?

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

### Can I use multiple schema types on one page?

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

### How do I add metadata to blog posts?

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

### What Schema.org types are supported?

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

### How do I add Twitter Card metadata?

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

### How do I set the canonical URL?

The `url` property in `SeoConfig` sets the canonical URL:

```typescript
const seo_config = {
	url: 'https://example.com/canonical-url', // This becomes canonical
	title: 'Page Title',
	description: 'Description',
};
```

### Can I use Svead with SvelteKit SSR?

Yes! Svead works perfectly with SvelteKit SSR. The `Head` component
uses `<svelte:head>` which renders on the server.

### How do I validate my structured data?

Use these tools:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- Browser DevTools: Inspect
  `<script type="application/ld+json">` tags

### Do I need both Head and SchemaOrg components?

No, they're independent:

- Use `Head` for meta tags (required for basic SEO)
- Use `SchemaOrg` for rich snippets (optional, but recommended)
- Use both for complete SEO coverage

## Troubleshooting

### My OpenGraph image isn't showing

Check these:

1. Image URL is absolute (not relative)
2. Image is accessible (publicly available)
3. Image meets size requirements (1200x630px recommended)
4. Test with
   [OpenGraph Debugger](https://www.opengraph.xyz/)

```typescript
// ✅ Good - absolute URL
open_graph_image: 'https://example.com/image.jpg';

// ❌ Bad - relative URL
open_graph_image: '/image.jpg';
```

### TypeScript errors with schema types

Make sure you're using the correct import:

```typescript
import type { SchemaOrgProps } from 'svead';

// Use this type
const schema: SchemaOrgProps['schema'] = {
	'@type': 'BlogPosting',
	// ...
};
```

### Schema validation errors

Common issues:

1. **Missing required fields**: Check
   [Schema.org documentation](https://schema.org) for required
   properties
2. **Wrong date format**: Use ISO 8601 format
   (`2023-08-22T10:00:00Z`)
3. **Invalid URL**: Use full URLs with protocol
   (`https://example.com`)

```typescript
// ✅ Good
datePublished: '2023-08-22T10:00:00Z';

// ❌ Bad
datePublished: '08/22/2023';
```

### Multiple meta tags appearing

If you see duplicate meta tags:

1. Check for conflicting SEO components
2. Remove any manual `<svelte:head>` meta tags
3. Use only one `Head` component per page

### The @context is missing

The `SchemaOrg` component automatically adds `@context` if missing.
If you need to add it manually:

```typescript
const schema = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	// ...
};
```

### Images not appearing in structured data

Ensure images are in `ImageObject` format when required:

```typescript
// ✅ Good - ImageObject format
primaryImageOfPage: {
  '@type': 'ImageObject',
  url: 'https://example.com/image.jpg',
}

// ❌ Bad - string format (sometimes works, but not recommended)
primaryImageOfPage: 'https://example.com/image.jpg'
```

## Quick Reference

### Installation

```bash
pnpm add -D svead
```

### Basic Usage

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

### Common Patterns Cheatsheet

| Use Case         | Component   | Schema Type      |
| :--------------- | :---------- | :--------------- |
| Basic SEO        | `Head`      | N/A              |
| Blog Post        | Both        | `BlogPosting`    |
| Product Page     | Both        | `Product`        |
| Recipe           | Both        | `Recipe`         |
| Event            | Both        | `Event`          |
| FAQ              | Both        | `FAQPage`        |
| Tutorial         | Both        | `HowTo`          |
| Video            | Both        | `VideoObject`    |
| Course           | Both        | `Course`         |
| News Article     | Both        | `NewsArticle`    |
| Breadcrumbs Only | `SchemaOrg` | `BreadcrumbList` |

For more information and full documentation, visit the
[Svead GitHub repository](https://github.com/spences10/svead).
