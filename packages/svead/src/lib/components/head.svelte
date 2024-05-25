<script lang="ts">
	import type { SeoConfig } from '$lib/types/index.js';
	import SchemaOrg from './schema-org.svelte';

	const { seo_config }: { seo_config: SeoConfig } = $props();

	const is_schema_org_props_valid = (props: SeoConfig): boolean => {
		return (
			props.schema_org_article !== undefined &&
			props.schema_org_website !== undefined &&
			props.schema_org_webpage !== undefined &&
			props.schema_org_entity !== undefined &&
			props.schema_org_publisher !== undefined &&
			props.schema_org_image_object !== undefined &&
			props.schema_org_breadcrumb_list !== undefined
		);
	};
</script>

<svelte:head>
	<link rel="canonical" href={seo_config.url} />

	<!-- HTML Meta Tags -->
	<title>{seo_config.title}</title>
	<meta name="title" content={seo_config.title} />
	<meta name="description" content={seo_config.description} />

	{#if seo_config.author_name}
		<meta name="author" content={seo_config.author_name} />
	{/if}

	<!-- Google / Search Engine Tags -->
	{#if seo_config.open_graph_image}
		<meta itemprop="name" content={seo_config.title} />
		<meta itemprop="description" content={seo_config.description} />
		<meta itemprop="image" content={seo_config.open_graph_image} />
	{/if}

	<!-- Facebook Meta Tags -->
	{#if seo_config.open_graph_image}
		<meta property="og:url" content={seo_config.url} />
		<meta property="og:type" content="website" />
		<meta property="og:title" content={seo_config.title} />
		<meta
			property="og:description"
			content={seo_config.description}
		/>
		<meta property="og:image" content={seo_config.open_graph_image} />
	{/if}

	<!-- Twitter Meta Tags -->
	{#if seo_config.open_graph_image}
		<meta name="twitter:card" content="summary_large_image" />
		{#if seo_config.website}
			<meta property="twitter:domain" content={seo_config.website} />
		{/if}
		<meta property="twitter:url" content={seo_config.url} />
		<meta name="twitter:title" content={seo_config.title} />
		<meta
			name="twitter:description"
			content={seo_config.description}
		/>
		<meta
			name="twitter:image"
			content={seo_config.open_graph_image}
		/>
	{/if}

	<!-- Monetisation -->
	{#if seo_config.payment_pointer}
		<meta name="monetization" content={seo_config.payment_pointer} />
	{/if}
</svelte:head>

{#if is_schema_org_props_valid(seo_config)}
	<SchemaOrg schema_org_props={seo_config} />
{/if}
