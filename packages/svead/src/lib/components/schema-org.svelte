<!-- 
	A lot of the inspiration for this component comes from Rodney Lab:
	https://github.com/rodneylab/sveltekit-blog-mdx/blob/a7d79aaff79132284dc300e592a98cc33043c4c2/src/lib/components/SEO/SchemaOrg.svelte
	and also from Kazuma Oe (oekazuma) and the https://github.com/oekazuma/svelte-meta-tags repo
 -->

<script lang="ts">
	import type { SchemaOrgProps } from '$lib/types/schema-org.js';

	const { schema }: SchemaOrgProps = $props();

	// Function to add '@context' to schema if it's missing
	function process_schema(schema: any): any {
		const context = { '@context': 'https://schema.org' };
		if (Array.isArray(schema)) {
			return [context, ...schema];
		}
		return { ...context, ...schema };
	}

	// Process schema
	const processed_schema = process_schema(schema);

	// Convert processed schema to JSON-LD script
	const json_ld_data =
		`<script type="application/ld+json">${JSON.stringify(processed_schema)}</scr` +
		`ipt>`;
</script>

<svelte:head>
	{@html json_ld_data}
</svelte:head>
