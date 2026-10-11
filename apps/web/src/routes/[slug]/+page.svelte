<script lang="ts">
	import DocsNav from '#lib/components/docs-nav.svelte';
	import { site } from '#lib/config.js';
	import { href_of, neighbours } from '#lib/docs/pages.js';
	import { doc_schema, seo_config } from '#lib/seo.js';
	import { page } from '$app/state';
	import { Head, SchemaOrg } from 'svead';

	let { data } = $props();
	let Copy = $derived(data.Copy);
	let doc = $derived(data.doc);
	let around = $derived(neighbours(doc.slug));
</script>

<Head
	seo_config={seo_config(
		{
			title: `${doc.title} | ${site.name}`,
			description: `${doc.description}. Documentation for Svead, the Svelte Head and Schema.org components.`,
			card: doc.slug,
		},
		`${site.url}${page.url.pathname}`,
	)}
/>
<SchemaOrg schema={doc_schema(doc)} />

<div
	class="site-width grid gap-x-14 pt-10 lg:grid-cols-[14rem_minmax(0,1fr)]"
>
	<aside class="hidden lg:block">
		<div
			class="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6"
		>
			<DocsNav current={doc.slug} />
		</div>
	</aside>

	<div class="min-w-0">
		<article class="doc prose">
			<Copy />
		</article>

		<nav
			aria-label="More documentation"
			class="mt-16 grid gap-4 border-t border-base-300 pt-6 sm:grid-cols-2"
		>
			{#if around.previous}
				<a href={href_of(around.previous)} class="group">
					<span class="block text-sm text-muted">Previous</span>
					<span
						class="font-display text-lg font-bold group-hover:underline group-hover:decoration-secondary group-hover:decoration-[3px] group-hover:underline-offset-4"
					>
						{around.previous.title}
					</span>
				</a>
			{/if}
			{#if around.next}
				<a
					href={href_of(around.next)}
					class="group sm:col-start-2 sm:text-right"
				>
					<span class="block text-sm text-muted">Next</span>
					<span
						class="font-display text-lg font-bold group-hover:underline group-hover:decoration-secondary group-hover:decoration-[3px] group-hover:underline-offset-4"
					>
						{around.next.title}
					</span>
				</a>
			{/if}
		</nav>

		<details class="mt-10 lg:hidden">
			<summary class="cursor-pointer font-display text-lg font-bold">
				All documentation
			</summary>
			<div class="mt-4">
				<DocsNav current={doc.slug} />
			</div>
		</details>
	</div>
</div>
