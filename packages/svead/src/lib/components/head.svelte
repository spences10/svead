<script lang="ts">
	import type { SeoConfig } from '$lib/types/seo-config.js';

	const { seo_config }: { seo_config: SeoConfig } = $props();
</script>

<svelte:head>
	<link rel="canonical" href={seo_config.url} />

	<!-- Basic Meta Tags -->
	<title>{seo_config.title}</title>
	<meta name="title" content={seo_config.title} />
	<meta name="description" content={seo_config.description} />

	{#if seo_config.author_name}
		<meta name="author" content={seo_config.author_name} />
	{/if}

	<!-- Open Graph / Facebook Meta Tags -->
	<meta property="og:url" content={seo_config.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={seo_config.title} />
	<meta property="og:description" content={seo_config.description} />
	{#if seo_config.open_graph_image}
		<meta property="og:image" content={seo_config.open_graph_image} />
		<meta property="og:image:alt" content={seo_config.open_graph_image_alt || seo_config.title} />
	{/if}
	{#if seo_config.site_name}
		<meta property="og:site_name" content={seo_config.site_name} />
	{/if}

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content={seo_config.twitter_card_type || "summary_large_image"} />
	<meta name="twitter:title" content={seo_config.title} />
	<meta name="twitter:description" content={seo_config.description} />
	{#if seo_config.open_graph_image}
		<meta name="twitter:image" content={seo_config.open_graph_image} />
	{/if}
	{#if seo_config.twitter_handle}
		<meta name="twitter:creator" content={seo_config.twitter_handle} />
	{/if}
	{#if seo_config.website}
		<meta property="twitter:domain" content={seo_config.website} />
		<meta property="twitter:url" content={seo_config.url} />
	{/if}

	<!-- Additional Structured Data -->
	<meta itemprop="name" content={seo_config.title} />
	<meta itemprop="description" content={seo_config.description} />
	{#if seo_config.open_graph_image}
		<meta itemprop="image" content={seo_config.open_graph_image} />
	{/if}

	<!-- Monetisation -->
	{#if seo_config.payment_pointer}
		<meta name="monetization" content={seo_config.payment_pointer} />
	{/if}

	<!-- Language -->
	{#if seo_config.language}
		<meta property="og:locale" content={seo_config.language} />
	{/if}
</svelte:head>