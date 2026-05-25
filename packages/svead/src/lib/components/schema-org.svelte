<!-- 
	A lot of the inspiration for this component comes from Rodney Lab:
	https://github.com/rodneylab/sveltekit-blog-mdx/blob/a7d79aaff79132284dc300e592a98cc33043c4c2/src/lib/components/SEO/SchemaOrg.svelte
	and also from Kazuma Oe (oekazuma) and the https://github.com/oekazuma/svelte-meta-tags repo
 -->

<script lang="ts">
	import type { Graph, Thing, WithContext } from 'schema-dts';
	import type {
		SchemaOrgProps,
		SchemaOrgType,
	} from '$lib/types/schema-org.js';

	const { schema }: SchemaOrgProps = $props();

	type JsonLdNode = Record<string, unknown>;

	function with_context(schema: SchemaOrgType): WithContext<Thing> | Graph {
		const node = schema as JsonLdNode;
		if ('@context' in node) return schema as WithContext<Thing> | Graph;
		return { '@context': 'https://schema.org', ...node } as WithContext<Thing>;
	}

	function process_schema(schema: SchemaOrgProps['schema']): WithContext<Thing> | Graph {
		if (Array.isArray(schema)) {
			return {
				'@context': 'https://schema.org',
				'@graph': schema.map((item) => {
					const { '@context': _context, ...node } = with_context(item) as JsonLdNode;
					return node as Thing;
				}),
			};
		}

		return with_context(schema);
	}

	const processed_schema = $derived(process_schema(schema));

	const json_ld_data = $derived(
		`<script type="application/ld+json">${JSON.stringify(processed_schema)}</scr` +
			`ipt>`,
	);
</script>

<svelte:head>
	{@html json_ld_data}
</svelte:head>
