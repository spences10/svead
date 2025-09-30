# Troubleshooting

## My OpenGraph image isn't showing

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

## TypeScript errors with schema types

Make sure you're using the correct import:

```typescript
import type { SchemaOrgProps } from 'svead';

// Use this type
const schema: SchemaOrgProps['schema'] = {
	'@type': 'BlogPosting',
	// ...
};
```

## Schema validation errors

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

## Multiple meta tags appearing

If you see duplicate meta tags:

1. Check for conflicting SEO components
2. Remove any manual `<svelte:head>` meta tags
3. Use only one `Head` component per page

## The @context is missing

The `SchemaOrg` component automatically adds `@context` if missing.
If you need to add it manually:

```typescript
const schema = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	// ...
};
```

## Images not appearing in structured data

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
