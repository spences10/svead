<script lang="ts">
	import { page } from '$app/state';
	import { Head, type SeoConfig } from 'svead';

	let { data } = $props();
	let Copy = $derived(data.Copy);
	let slug = $derived(data.slug);

	// Convert slug to title (e.g., "quick-reference" -> "Quick Reference")
	const title = $derived(
		slug
			.split('-')
			.map(
				(word: string) => word.charAt(0).toUpperCase() + word.slice(1),
			)
			.join(' '),
	);

	const seo_config: SeoConfig = $derived({
		title: `${title} | Svead Documentation`,
		description: `${title} documentation for Svead - SEO and Schema.org helpers for SvelteKit`,
		url: page.url.href,
		website: 'https://svead.vercel.app',
		language: 'en',
		site_name: 'Svead Documentation',
	});
</script>

<Head {seo_config} />

<Copy />
