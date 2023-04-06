<script lang="ts">
	import type {
		AuthorType,
		ContentType,
		MainEntityType,
		PublisherType,
	} from '../../types'

	// Required props
	export let url: string // Full URL of the current page
	export let title: string // Page title
	export let description: string // Page description

	// Optional props
	export let website: string = '' // Website URL
	export let authorName: string = '' // Author name
	export let image: string = '' // Open Graph image URL
	export let paymentPointer: string = '' // Web Monetization payment pointer

	// JSON-LD data
	export let datePublished: string = '' // Date published in ISO 8601 format
	export let dateModified: string = '' // Date modified in ISO 8601 format
	export let contentType: ContentType = 'WebPage' // Content type for JSON-LD
	export let mainEntity: MainEntityType = 'Article' // Main content type for JSON-LD
	export let language: string = 'en' // Language code (default: 'en' for English)
	export let authorType: AuthorType = 'Person' // Author type for JSON-LD
	export let publisherType: PublisherType = 'Organization' // Publisher type for JSON-LD

	// JSON-LD object construction
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': contentType,
		url: url,
		name: title,
		description: description,
		author: {
			'@type': authorType,
			name: authorName,
		},
		publisher: {
			'@type': publisherType,
			name: website,
			logo: {
				'@type': 'ImageObject',
				url: image,
			},
		},
		image: image,
		datePublished: datePublished,
		dateModified: dateModified,
		inLanguage: language,
	}
</script>

<!-- 
  Ahrefs guidance:
  - Generally recommended <title> length is between 50 and 60 characters  
  - A general recommendation today is to keep your page <description> between 110 and 160 characters
-->

<svelte:head>
	<link rel="canonical" href={url} />

	<!-- HTML Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	{#if authorName}
		<meta name="author" content={authorName} />
	{/if}

	<!-- Google / Search Engine Tags -->
	{#if image.length > 0}
		<meta itemprop="name" content={title} />
		<meta itemprop="description" content={description} />
		<meta itemprop="image" content={image} />
	{/if}

	<!-- Facebook Meta Tags -->
	{#if image.length > 0}
		<meta property="og:url" content={url} />
		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:image" content={image} />
	{/if}

	<!-- Twitter Meta Tags -->
	{#if image.length > 0}
		<meta name="twitter:card" content="summary_large_image" />
		{#if website}
			<meta property="twitter:domain" content={website} />
		{/if}
		<meta property="twitter:url" content={url} />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={image} />
	{/if}

	<!-- Monetisation -->
	{#if paymentPointer.length > 0}
		<meta name="monetization" content={paymentPointer} />
	{/if}

	<!-- JSON-LD -->
	<meta itemprop="mainEntityOfPage" content={mainEntity} />

	<script type="application/ld+json">
		{
			JSON.stringify(jsonLd)
		}
	</script>
</svelte:head>
