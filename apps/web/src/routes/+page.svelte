<script lang="ts">
	import CopyButton from '#lib/components/copy-button.svelte';
	import Pint from '#lib/components/pint.svelte';
	import Seo from '#lib/components/seo.svelte';
	import TapList from '#lib/components/tap-list.svelte';
	import Install from '#lib/copy/home.md';
	import { home_schema, home_seo } from '#lib/seo.js';

	const install_command = 'pnpm add -D svead';
</script>

<Seo page={home_seo} schema={home_schema()} />

<section
	class="site-width grid items-center gap-x-14 gap-y-12 pt-12 pb-16 lg:grid-cols-[1fr_minmax(0,30rem)] lg:pt-14"
>
	<div>
		<h1
			class="text-[clamp(2.75rem,8vw,4.75rem)] leading-[0.98] font-black"
		>
			Put a proper <code class="tag">&lt;Head /&gt;</code> on every page.
		</h1>
		<p class="mt-6 max-w-136 text-xl">
			Svead is two Svelte components. <code class="name">Head</code>
			sets your title, canonical, Open Graph and Twitter tags.
			<code class="name">SchemaOrg</code> adds JSON-LD structured data.
		</p>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<div
				class="flex items-center gap-1 rounded-field border border-base-300 bg-base-200 py-1 pr-1 pl-4 font-mono text-[0.9375rem]"
			>
				<span>{install_command}</span>
				<CopyButton
					text={install_command}
					label="Copy install command"
				/>
			</div>
			<a class="btn btn-primary" href="/quick-reference">
				Read the quick reference
			</a>
		</div>
		<p class="mt-8 text-[0.9375rem] text-muted">
			Svelte + Head = Svead. It rhymes with mead, hence the pint.
		</p>
	</div>
	<Pint />
</section>

<section class="border-y border-base-300 bg-base-200/60 py-16">
	<div class="site-width">
		<h2 class="mb-8 text-4xl font-extrabold">On tap</h2>
		<TapList />
	</div>
</section>

<section class="site-width pt-16">
	<div class="doc prose max-w-3xl">
		<Install />
	</div>
</section>

<style>
	/* The component, named in the headline as you'd write it */
	.tag {
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.8em;
		font-weight: 800;
		letter-spacing: -0.06em;
		/* A mono space is a wide gap at this size */
		word-spacing: -0.35em;
		white-space: nowrap;
	}

	.name {
		font-family: var(--font-mono);
		font-size: 0.9em;
		font-weight: 600;
	}
</style>
