<script lang="ts">
	import { site } from '#lib/config.js';
	import { GitHub } from '#lib/icons/index.js';
	import * as Fathom from 'fathom-client';
	import SearchTrigger from './search-trigger.svelte';
	import ThemeToggle from './theme-toggle.svelte';
</script>

<header
	class="sticky top-0 z-20 border-b border-base-300 bg-base-100/90 backdrop-blur"
>
	<div class="site-width flex h-16 items-center gap-2">
		<a
			href="/"
			class="mr-auto flex items-center gap-2 font-display text-xl font-extrabold tracking-tight"
		>
			<span aria-hidden="true">🍺</span>
			<span>svead</span>
		</a>
		<SearchTrigger />
		<ThemeToggle />
		<a
			class="btn btn-square btn-ghost [&_svg]:text-base-content"
			aria-label="svead on GitHub"
			href={site.repo}
			target="_blank"
			rel="noopener noreferrer"
			onclick={() =>
				Fathom.trackEvent(`GitHub svead project clicked`)}
		>
			<GitHub height="22" width="22" fill="fill-current" />
		</a>
	</div>
</header>
