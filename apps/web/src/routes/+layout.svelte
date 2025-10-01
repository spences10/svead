<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import { GitHub } from '$lib';
	import Bluesky from '$lib/icons/bluesky.svelte';
	import Github from '$lib/icons/github.svelte';
	import Youtube from '$lib/icons/youtube.svelte';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';
	import '../app.css';
	import '../prism.css';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const { PUBLIC_FATHOM_ID, PUBLIC_FATHOM_URL } = env;

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_ID!, {
			url: PUBLIC_FATHOM_URL,
		});
	});

	onMount(() => {
		(page.url.pathname, browser && Fathom.trackPageview());
	});
</script>

<header class="flex items-center justify-between px-4 py-2">
	<a
		href="/"
		class="from-primary via-accent to-info animate-none bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent hover:animate-pulse hover:transition"
	>
		Svead
	</a>
	<span
		class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
		data-tip="GitHub"
	>
		<div class="flex-none items-center">
			<a
				aria-label="Github"
				onclick={() =>
					Fathom.trackEvent(`GitHub svead project clicked`)}
				target="_blank"
				href="https://github.com/spences10/svead"
				rel="noopener noreferrer"
				class="btn btn-square btn-ghost drawer-button normal-case"
			>
				<GitHub
					height="30"
					width="30"
					fill="fill-white fill-primary"
				/>
			</a>
		</div>
	</span>
</header>

<main
	class="prose prose-xl container mx-auto mb-20 max-w-3xl flex-grow px-4"
>
	{@render children?.()}
</main>

<footer
	class="footer footer-horizontal footer-center bg-primary rounded p-10 text-xl"
>
	<nav class="grid grid-flow-col gap-4">
		<a
			href="/quick-reference"
			class="link hover:text-secondary transition">Quick Reference</a
		>
		<a
			href="/components"
			class="link hover:text-secondary transition"
		>
			Components
		</a>
		<a
			href="/real-world-patterns"
			class="link hover:text-secondary transition"
		>
			Real-World Patterns
		</a>
		<a href="/faq" class="link hover:text-secondary transition">FAQ</a
		>
	</nav>
	<nav>
		<div class="grid grid-flow-col gap-4">
			<a
				aria-label="Bluesky"
				onclick={() => Fathom.trackEvent(`Bluesky clicked`)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://ss10.dev/bluesky"
			>
				<Bluesky />
			</a>
			<a
				aria-label="GitHub"
				onclick={() => Fathom.trackEvent(`GitHub clicked`)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://ss10.dev/git"
			>
				<Github />
			</a>
			<a
				aria-label="YouTube"
				onclick={() => Fathom.trackEvent(`YouTube clicked`)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://ss10.dev/yt"
			>
				<Youtube />
			</a>
		</div>
	</nav>
	<aside>
		<img
			src="spencee.png"
			alt="Scott avatar"
			class="mb-4 h-10 rounded-full"
		/>
		<p class="font-bold">
			Made with <span role="img" aria-label="red heart">❤️</span> by
			<a
				class="link hover:text-secondary transition"
				onclick={() => Fathom.trackEvent(`scottspence.com clicked`)}
				href="https://scottspence.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				Scott Spence
			</a>
		</p>
	</aside>
	<aside>
		<p>
			Copyright © {`${new Date().getFullYear()}`} - All rights reserved
			<span role="img" aria-label="shrugging emoji">🤷</span>
		</p>
	</aside>
</footer>
