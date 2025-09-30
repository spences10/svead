# Leveraging schema-dts Type Safety

Svead uses `schema-dts` which provides TypeScript types for all 800+
Schema.org types. Here's how to leverage it effectively:

## Type-Safe Schema Creation

Get full autocomplete and type checking:

```typescript
import type { BlogPosting, Person, Organization } from 'schema-dts';
import type { SchemaOrgProps } from 'svead';

// Strongly typed - autocomplete available for all properties
const author: Person = {
	'@type': 'Person',
	name: 'John Doe',
	url: 'https://example.com/author/john',
	sameAs: [
		'https://twitter.com/johndoe',
		'https://github.com/johndoe',
	],
	jobTitle: 'Developer', // Autocomplete knows valid properties
};

const blog_post: BlogPosting = {
	'@type': 'BlogPosting',
	headline: 'My Blog Post',
	author: author, // Type-safe nesting
	datePublished: '2023-08-22T10:00:00Z',
	// TypeScript will error on invalid properties
};

const schema: SchemaOrgProps['schema'] = blog_post;
```

## Reusable Typed Schemas

Create reusable, type-safe schema fragments:

```typescript
import type { Person, Organization, ImageObject } from 'schema-dts';

// Typed person schema
const create_person = (name: string, url: string): Person => ({
	'@type': 'Person',
	name,
	url,
	sameAs: [
		`https://twitter.com/${name.toLowerCase()}`,
		`https://github.com/${name.toLowerCase()}`,
	],
});

// Typed organization schema
const create_organization = (
	name: string,
	url: string,
): Organization => ({
	'@type': 'Organization',
	name,
	url,
	logo: {
		'@type': 'ImageObject',
		url: `${url}/logo.png`,
	},
});

// Use in schemas with type safety
const schema: SchemaOrgProps['schema'] = {
	'@type': 'BlogPosting',
	headline: 'Article',
	author: create_person('John Doe', 'https://example.com'),
	publisher: create_organization('Example', 'https://example.com'),
};
```

## Union Types for Flexible Schemas

schema-dts supports union types for properties that accept multiple
types:

```typescript
import type { BlogPosting, Person, Organization } from 'schema-dts';

// author can be Person, Organization, or array of either
const schema: BlogPosting = {
	'@type': 'BlogPosting',
	headline: 'Article',
	// Single person
	author: {
		'@type': 'Person',
		name: 'John',
	},
	// Or organization
	// author: {
	//   '@type': 'Organization',
	//   name: 'Company'
	// },
	// Or array of authors
	// author: [
	//   { '@type': 'Person', name: 'John' },
	//   { '@type': 'Person', name: 'Jane' }
	// ]
};
```

## Array Schemas with Type Safety

When using arrays, schema-dts maintains type safety:

```typescript
import type { ItemList, ListItem } from 'schema-dts';

const item_list: ItemList = {
	'@type': 'ItemList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			item: {
				'@type': 'Product',
				name: 'Product 1',
			},
		},
		{
			'@type': 'ListItem',
			position: 2,
			item: {
				'@type': 'Product',
				name: 'Product 2',
			},
		},
	],
};
```

## Complex Nested Schemas

schema-dts handles deep nesting with full type safety:

```typescript
import type {
	Recipe,
	HowToStep,
	NutritionInformation,
} from 'schema-dts';

const recipe: Recipe = {
	'@type': 'Recipe',
	name: 'Chocolate Cake',
	recipeIngredient: ['flour', 'sugar', 'cocoa'],
	recipeInstructions: [
		{
			'@type': 'HowToStep',
			name: 'Mix ingredients',
			text: 'Mix all ingredients together',
			image: 'https://example.com/step1.jpg',
		},
		{
			'@type': 'HowToStep',
			name: 'Bake',
			text: 'Bake at 350°F for 30 minutes',
		},
	],
	nutrition: {
		'@type': 'NutritionInformation',
		calories: '350 calories',
		fatContent: '12g',
		proteinContent: '5g',
	},
	aggregateRating: {
		'@type': 'AggregateRating',
		ratingValue: '4.8',
		reviewCount: '124',
	},
};
```

## Using WithContext Type

schema-dts provides `WithContext<T>` to include `@context`:

```typescript
import type { WithContext, BlogPosting } from 'schema-dts';

// This type includes @context automatically
const schema: WithContext<BlogPosting> = {
	'@context': 'https://schema.org',
	'@type': 'BlogPosting',
	headline: 'Article',
};

// SchemaOrg component adds @context if missing, so this is optional
```

## Type Guards and Validation

Use TypeScript to validate schema structure:

```typescript
import type { Thing } from 'schema-dts';

// Function that only accepts valid Thing types
function validate_schema(schema: Thing): boolean {
	// TypeScript ensures schema has correct structure
	return !!schema['@type'];
}

// Type-safe schema manipulation
const schema: Thing = {
	'@type': 'BlogPosting',
	headline: 'Title',
};

if (validate_schema(schema)) {
	// Safe to use
}
```

## Importing Specific Types

Import only what you need for better tree-shaking:

```typescript
// Import specific types
import type {
	BlogPosting,
	Person,
	Organization,
	ImageObject,
	BreadcrumbList,
	ListItem,
} from 'schema-dts';

// Instead of importing everything
// import type { Thing } from 'schema-dts';
```

## Common Type Patterns

Frequently used type combinations:

```typescript
import type {
	BlogPosting,
	Person,
	Organization,
	ImageObject,
} from 'schema-dts';

// Author (can be Person or Organization)
type Author = Person | Organization;

// Image (can be string URL or ImageObject)
type Image = string | ImageObject | ImageObject[];

// Reusable function with types
function create_blog_post(
	headline: string,
	author: Author,
	image?: Image,
): BlogPosting {
	return {
		'@type': 'BlogPosting',
		headline,
		author,
		...(image && { image }),
		datePublished: new Date().toISOString(),
	};
}

// Type-safe usage
const post = create_blog_post(
	'My Post',
	{ '@type': 'Person', name: 'John' },
	'https://example.com/image.jpg',
);
```

## Catching Errors at Compile Time

schema-dts catches errors before runtime:

```typescript
import type { BlogPosting } from 'schema-dts';

const schema: BlogPosting = {
	'@type': 'BlogPosting',
	headline: 'Title',
	// ❌ TypeScript error: 'invalidProperty' doesn't exist on BlogPosting
	// invalidProperty: 'value',

	// ❌ TypeScript error: wrong type
	// datePublished: 123,

	// ✅ Correct
	datePublished: '2023-08-22T10:00:00Z',
};
```

## Extending Schemas with Custom Properties

While schema-dts is strict, you can add custom properties:

```typescript
import type { BlogPosting } from 'schema-dts';

// Extend with custom properties if needed
interface CustomBlogPosting extends BlogPosting {
	customField?: string;
}

const schema: CustomBlogPosting = {
	'@type': 'BlogPosting',
	headline: 'Title',
	customField: 'Custom data',
};

// Note: Custom properties won't validate with Schema.org validators
```
