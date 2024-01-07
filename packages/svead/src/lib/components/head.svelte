<script lang="ts">
	import type { MainEntity, SeoConfig } from '$lib/types.js';
	import type { SchemaOrgProps } from './schema-org-props.js';
	import SchemaOrg from './schema-org.svelte';

	export let seo_config: SeoConfig;

	// Derived properties for SchemaOrg
	let schema_org_props: SchemaOrgProps = {
		url: seo_config.url,
		title: seo_config.title,
		description: seo_config.description,
		website: seo_config.website,
		authorName: seo_config.author_name,
		authorType: seo_config.author_type,
		authorUrl: '',
		image: seo_config.image,
		datePublished: '',
		dateModified: '',
		language: seo_config.language,
		mainEntity: seo_config.main_entity as MainEntity,
		breadcrumbs: seo_config.breadcrumbs,
	};
</script>

<svelte:head>
	<link rel="canonical" href={seo_config.url} />

	<!-- HTML Meta Tags -->
	<title>{seo_config.title}</title>
	<meta name="title" content={seo_config.title} />
	<meta name="description" content={seo_config.description} />
	{#if schema_org_props.authorName}
		<meta name="author" content={schema_org_props.authorName} />
	{/if}

	<!-- Google / Search Engine Tags -->
	{#if schema_org_props.image}
		<meta itemprop="name" content={seo_config.title} />
		<meta itemprop="description" content={seo_config.description} />
		<meta itemprop="image" content={schema_org_props.image} />
	{/if}

	<!-- Facebook Meta Tags -->
	{#if schema_org_props.image}
		<meta property="og:url" content={seo_config.url} />
		<meta property="og:type" content="website" />
		<meta property="og:title" content={seo_config.title} />
		<meta
			property="og:description"
			content={seo_config.description}
		/>
		<meta property="og:image" content={schema_org_props.image} />
	{/if}

	<!-- Twitter Meta Tags -->
	{#if schema_org_props.image}
		<meta name="twitter:card" content="summary_large_image" />
		{#if schema_org_props.website}
			<meta
				property="twitter:domain"
				content={schema_org_props.website}
			/>
		{/if}
		<meta property="twitter:url" content={seo_config.url} />
		<meta name="twitter:title" content={seo_config.title} />
		<meta
			name="twitter:description"
			content={seo_config.description}
		/>
		<meta name="twitter:image" content={schema_org_props.image} />
	{/if}

	<!-- Monetisation -->
	{#if seo_config.payment_pointer}
		<meta name="monetization" content={seo_config.payment_pointer} />
	{/if}
</svelte:head>

<SchemaOrg {schema_org_props} />
