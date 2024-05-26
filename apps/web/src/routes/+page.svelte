<script lang="ts">
	import { page } from '$app/stores';
	import { Head, type SeoConfig } from 'svead';

	export let data;
	let { Copy } = data;

	const seo_config: SeoConfig = {
		title: 'This is Svead a Svelte Head Component',
		description:
			'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.',
		author_name: 'Scott Spence',
		open_graph_image:
			'https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.pages.dev&footerTailwind=text-teal-600',
		website: 'https://svead.pages.dev',
		url: $page.url.toString(),
	};
</script>

<Head {seo_config} />

<svelte:component this={Copy} />
