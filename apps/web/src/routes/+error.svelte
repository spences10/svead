<script lang="ts">
	import { site } from '#lib/config.js';
	import { palette } from '#lib/state/palette.svelte.js';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | {site.name}</title>
</svelte:head>

<section class="site-width py-24">
	<p class="font-mono text-muted">{page.status}</p>
	<h1 class="mt-2 text-5xl font-extrabold">
		{page.status === 404 ? 'This glass is empty' : 'Something broke'}
	</h1>
	<p class="mt-4 max-w-prose text-lg text-muted">
		{page.status === 404
			? 'There’s no page at this address. Search the docs, or start again from the home page.'
			: page.error?.message}
	</p>
	<div class="mt-8 flex flex-wrap gap-3">
		<button
			type="button"
			class="btn btn-primary"
			onclick={() => (palette.open = true)}
		>
			Search the docs
		</button>
		<a class="btn btn-ghost" href="/">Go to the home page</a>
	</div>
</section>
