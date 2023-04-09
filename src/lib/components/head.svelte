<script lang="ts">
	import type { AuthorType, MainEntity } from '$lib/types'
	import type { MainEntityType } from '../main-entity-types'
	import type { SchemaOrgProps } from './schema-org-props'
	import SchemaOrg from './schema-org.svelte'

	// Required props
	export let url: string // Full URL of the current page
	export let title: string // Page title
	export let description: string // Page description

	// Optional props
	export let website: string = '' // Website URL
	export let authorName: string = '' // Author name
	export let image: string = '' // Open Graph image URL
	export let paymentPointer: string = '' // Web Monetization payment pointer
	export let datePublished: string = '' // ISO 8601 format
	export let dateModified: string = '' // ISO 8601 format
	export let contentType: MainEntityType = 'WebPage'
	export let language: string = 'en'
	export let authorType: AuthorType = 'Person'
	export let authorUrl: string = ''

	const mainEntity: MainEntity = {
		type: contentType,
		name: title,
		url,
		headline: title,
		description,
		image,
		datePublished,
		dateModified,
		author: {
			type: authorType,
			name: authorName,
			url: authorUrl,
		},
		publisher: {
			type: 'Organization',
			name: website,
			logo: '',
		},
	}

	const schemaOrgProps: SchemaOrgProps = {
		url,
		title,
		description,
		website,
		authorName,
		authorType,
		authorUrl,
		image,
		datePublished,
		dateModified,
		language,
		mainEntity,
		breadcrumbs: [],
	}
</script>

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
	{#if image}
		<meta itemprop="name" content={title} />
		<meta itemprop="description" content={description} />
		<meta itemprop="image" content={image} />
	{/if}

	<!-- Facebook Meta Tags -->
	{#if image}
		<meta property="og:url" content={url} />
		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:image" content={image} />
	{/if}

	<!-- Twitter Meta Tags -->
	{#if image}
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
	{#if paymentPointer}
		<meta name="monetization" content={paymentPointer} />
	{/if}
</svelte:head>

<SchemaOrg {schemaOrgProps} />
