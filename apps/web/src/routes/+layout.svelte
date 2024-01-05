<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import '../prism.css';
	import { GitHub, Twitter, YouTube } from '$lib';

	const { PUBLIC_FATHOM_ID, PUBLIC_FATHOM_URL } = env;

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_ID, {
			url: PUBLIC_FATHOM_URL,
		});
	});

	$: $page.url.pathname, browser && Fathom.trackPageview();
</script>

<header class="text-right">
	<span
		class="tooltip tooltip-bottom m-4 before:text-xs before:content-[attr(data-tip)]"
		data-tip="GitHub"
	>
		<div class="flex-none items-center">
			<a
				aria-label="Github"
				on:click={() => Fathom.trackGoal(`WNWCZIRF`, 1)}
				target="_blank"
				href="https://github.com/spences10/svead"
				rel="noopener noreferrer"
				class="btn btn-ghost drawer-button btn-square normal-case"
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
	<slot />
</main>

<footer
	class="footer bg-primary text-primary-content footer-center p-10"
>
	<div class="text-xl">
		<img
			src="spencee.png"
			alt="Scott avatar"
			class="h-20 rounded-full"
		/>
		<p class="font-bold">
			Made with <span role="img" aria-label="red heart">❤️</span> by
			<a
				class="link hover:text-secondary transition"
				on:click={() => Fathom.trackGoal(`VDR2FTJB`, 1)}
				href="https://scottspence.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				Scott Spence
			</a>
		</p>
		<p>
			Copyright © {`${new Date().getFullYear()}`} - All rights reserved
			<span role="img" aria-label="shruggin emoji">🤷</span>
		</p>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a
				aria-label="Twitter"
				on:click={() => Fathom.trackGoal(`HGJHQROG`, 1)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://twitter.com/spences10"
			>
				<Twitter />
			</a>
			<a
				aria-label="GitHub"
				on:click={() => Fathom.trackGoal(`S49BM68P`, 1)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/spences10"
			>
				<GitHub />
			</a>
			<a
				aria-label="YouTube"
				on:click={() => Fathom.trackGoal(`MQSXN6NV`, 1)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://ss10/yt"
			>
				<YouTube />
			</a>
		</div>
	</div>
</footer>
