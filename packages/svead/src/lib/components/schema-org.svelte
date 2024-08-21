<!-- 
	A lot of the inspiration for this component comes from Rodney Lab:
	https://github.com/rodneylab/sveltekit-blog-mdx/blob/a7d79aaff79132284dc300e592a98cc33043c4c2/src/lib/components/SEO/SchemaOrg.svelte
	and also from Kazuma Oe (oekazuma) and the https://github.com/oekazuma/svelte-meta-tags repo
 -->

<script lang="ts">
	import type { SchemaOrgProps } from '$lib/types/schema-org.js';

	const { schema }: { schema: SchemaOrgProps } = $props();

	// Function to add '@context' to schema
	function add_context<T>(schema: T): T & { '@context': string } {
		return {
			'@context': 'https://schema.org',
			...schema,
		};
	}

	// Process schema to add context
	const process_schema = add_context(schema);

	// Convert processed schema to JSON-LD script
	const json_ld_data =
		`<script type="application/ld+json">${JSON.stringify(process_schema)}</scr` +
		`ipt>`;
</script>

<svelte:head>
	{@html json_ld_data}
</svelte:head>
