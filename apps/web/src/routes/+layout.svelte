<script lang="ts">
	import CommandPalette from '#lib/components/command-palette.svelte';
	import SiteFooter from '#lib/components/site-footer.svelte';
	import SiteHeader from '#lib/components/site-header.svelte';
	import { read_stored_code } from '#lib/state/code.svelte.js';
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$app/env/public';
	import { afterNavigate } from '$app/navigation';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		read_stored_code();
		if (!PUBLIC_FATHOM_ID) return;
		Fathom.load(PUBLIC_FATHOM_ID, {
			url: PUBLIC_FATHOM_URL,
		});
	});

	// On arrival and on every move to another page. Jumping to a
	// heading on the same page isn't a new view
	afterNavigate(({ from, to }) => {
		if (from?.url.pathname === to?.url.pathname) return;
		Fathom.trackPageview();
	});
</script>

<a
	href="#main"
	class="btn sr-only btn-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-30"
>
	Skip to content
</a>

<SiteHeader />

<main id="main">
	{@render children?.()}
</main>

<SiteFooter />

<CommandPalette />
