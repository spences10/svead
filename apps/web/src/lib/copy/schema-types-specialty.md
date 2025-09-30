# More Schema Types

## FAQ Page - Frequently Asked Questions

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

## Product - E-commerce Product Pages

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

## Recipe - Recipe Pages

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

## Event - Events and Conferences

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

## HowTo - Tutorial and Guide Pages

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

## Video - Video Content

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

## Course - Educational Content

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
