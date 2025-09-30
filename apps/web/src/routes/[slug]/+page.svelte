<script lang="ts">
	import { page } from '$app/stores';
	import { Head, type SeoConfig } from 'svead';

	export let data;
	let { Copy, slug } = data;

	// Convert slug to title (e.g., "quick-reference" -> "Quick Reference")
	const title = slug
		.split('-')
		.map(
			(word: string) => word.charAt(0).toUpperCase() + word.slice(1),
		)
		.join(' ');

	const seo_config: SeoConfig = {
		title: `${title} | Svead Documentation`,
		description: `${title} documentation for Svead - SEO and Schema.org helpers for SvelteKit`,
		url: $page.url.href,
		website: 'https://svead.vercel.app',
		language: 'en',
		site_name: 'Svead Documentation',
	};
</script>

<Head {seo_config} />

<Copy />
