## Tips & Best Practices

## Date Formatting

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

## Image Properties

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

## Validation

Always validate your structured data:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- Use browser DevTools to inspect `<script type="application/ld+json">`
  tags

## Type Safety

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

## Default Language

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

## Twitter Card Types

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

## Web Monetization

Add payment pointer for Web Monetization:

```typescript
const seo_config: SeoConfig = {
	title: 'Page Title',
	description: 'Description',
	url: 'https://example.com',
	payment_pointer: '$ilp.uphold.com/your-payment-pointer',
};
```
