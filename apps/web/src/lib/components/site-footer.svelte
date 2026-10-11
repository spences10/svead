<script lang="ts">
	import { site } from '#lib/config.js';
	import Bluesky from '#lib/icons/bluesky.svelte';
	import Github from '#lib/icons/github.svelte';
	import Youtube from '#lib/icons/youtube.svelte';
	import spencee_img from '#lib/images/spencee.png';
	import * as Fathom from 'fathom-client';
</script>

<footer class="mt-24 border-t border-base-300 bg-base-200">
	<div
		class="site-width flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between"
	>
		<div class="flex items-center gap-4">
			<img
				src={spencee_img}
				alt=""
				class="size-12 rounded-full"
				loading="lazy"
			/>
			<p>
				Brewed by
				<a
					class="link font-semibold"
					href="https://scottspence.com"
					target="_blank"
					rel="noopener noreferrer"
					onclick={() => Fathom.trackEvent(`scottspence.com clicked`)}
				>
					Scott Spence
				</a>
				and
				<a
					class="link"
					href="{site.repo}#contributors-"
					target="_blank"
					rel="noopener noreferrer">contributors</a
				>.
				<span class="block text-sm text-muted">
					MIT licensed. Copyright © {new Date().getFullYear()}.
				</span>
			</p>
		</div>
		<nav
			aria-label="Elsewhere"
			class="flex items-center gap-1 [&_svg]:size-4.5 [&_svg]:text-base-content"
		>
			<a
				class="btn btn-ghost btn-sm"
				href={site.npm}
				target="_blank"
				rel="noopener noreferrer">npm</a
			>
			<a
				class="btn btn-square btn-ghost btn-sm"
				aria-label="Scott on Bluesky"
				href="https://ss10.dev/bluesky"
				target="_blank"
				rel="noopener noreferrer"
				onclick={() => Fathom.trackEvent(`Bluesky clicked`)}
			>
				<Bluesky />
			</a>
			<a
				class="btn btn-square btn-ghost btn-sm"
				aria-label="Scott on GitHub"
				href="https://ss10.dev/git"
				target="_blank"
				rel="noopener noreferrer"
				onclick={() => Fathom.trackEvent(`GitHub clicked`)}
			>
				<Github />
			</a>
			<a
				class="btn btn-square btn-ghost btn-sm"
				aria-label="Scott on YouTube"
				href="https://ss10.dev/yt"
				target="_blank"
				rel="noopener noreferrer"
				onclick={() => Fathom.trackEvent(`YouTube clicked`)}
			>
				<Youtube />
			</a>
		</nav>
	</div>
</footer>
