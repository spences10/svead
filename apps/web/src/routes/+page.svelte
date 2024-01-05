<script lang="ts">
	import { page } from '$app/stores';
	import Head from '$lib/components/head.svelte';

	export let data;
	let { Copy } = data;

	let title = 'This is Svead a Svelte Head Component';
	let description =
		'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.';
	let image = `https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.vercel.app&footerTailwind=text-teal-600`;
	let website = 'https://svead.vercel.app/';
	let url = $page.url.toString();
</script>

<Head {title} {description} {image} {url} {website} />

<svelte:component this={Copy} />
