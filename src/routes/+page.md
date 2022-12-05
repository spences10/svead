<script>
	import { page } from '$app/stores'
	import { Head } from 'svead'

	let title = 'This is Svead a Svelte Head Component'
	let description =
		'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.'
	let image = `https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.vercel.app&footerTailwind=text-teal-600`
	let website = 'https://svead.vercel.app/'
	let url = $page.url.toString()
</script>

<Head {title} {description} {image} {url} {website} />

# Welcome to Svead

The Svelte Head Component.

Svead, a component that allows you to set head meta information,
canonical, title, Twitter and Facebook Open Graph tags.

Visit <a href="https://github.com/spences10/svead">GitHub</a> to
contrubute to this project.

View source (<code>Ctrl+u</code> or <code>⌘+⌥+u</code> on macOS) to
see all the head goodness.

Yes. it's `<svelte:head>` with props being passed to it!

I have several projects that use the same code so I decided to package
it up for use in other projects.

## Props

It takes the following props:

**Required props**

```ts
url: string // Full URL of the current page
title: string // page title
description: string // page description
```

**Optional props**

```ts
website: string = '' // website URL
authorName: string = '' // Author Name
image: string = '' // Open Graph image
paymentPointer: string = '' // Web Monetisation Payment pointer
```

## Use it

```bash
pnpm i -D svead
```

Import it into your Svelte pages and use:

```svelte
<script>
	import { page } from '$app/stores'
	import { Head } from 'svead'

	let title = 'This is Svead a Svelte Head Component'
	let image = `https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.vercel.app&footerTailwind=text-teal-600`
	let description =
		'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.'
	let url = $page.url.toString()
</script>

<Head {title} {description} {image} {url} />
```

## Output

```html
<head>
	<title>This is Svead a Svelte Head Component</title>
	<link rel="canonical" href="https://svead.vercel.app/" />
	<meta
		name="title"
		content="This is Svead a Svelte Head Component"
	/>
	<meta
		name="description"
		content="Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags."
	/>
	<meta name="author" content="" />
	<meta
		itemprop="name"
		content="This is Svead a Svelte Head Component"
	/>
	<meta
		itemprop="description"
		content="Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags."
	/>
	<meta
		itemprop="image"
		content="https://og.tailgraph.com/og?fontFamily=Roboto&amp;title=This+is+Svead&amp;titleTailwind=text-gray-800+font-bold+text-6xl&amp;text=Set+Head+meta+tag+information&amp;textTailwind=text-gray-700+text-2xl+mt-4&amp;logoTailwind=h-8&amp;bgTailwind=bg-white&amp;footer=svead.vercel.app&amp;footerTailwind=text-teal-600"
	/>
	<meta property="og:url" content="https://svead.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content="This is Svead a Svelte Head Component"
	/>
	<meta
		property="og:description"
		content="Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags."
	/>
	<meta
		property="og:image"
		content="https://og.tailgraph.com/og?fontFamily=Roboto&amp;title=This+is+Svead&amp;titleTailwind=text-gray-800+font-bold+text-6xl&amp;text=Set+Head+meta+tag+information&amp;textTailwind=text-gray-700+text-2xl+mt-4&amp;logoTailwind=h-8&amp;bgTailwind=bg-white&amp;footer=svead.vercel.app&amp;footerTailwind=text-teal-600"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		property="twitter:domain"
		content="https://svead.vercel.app/"
	/>
	<meta property="twitter:url" content="https://svead.vercel.app/" />
	<meta
		name="twitter:title"
		content="This is Svead a Svelte Head Component"
	/>
	<meta
		name="twitter:description"
		content="Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags."
	/>
	<meta
		name="twitter:image"
		content="https://og.tailgraph.com/og?fontFamily=Roboto&amp;title=This+is+Svead&amp;titleTailwind=text-gray-800+font-bold+text-6xl&amp;text=Set+Head+meta+tag+information&amp;textTailwind=text-gray-700+text-2xl+mt-4&amp;logoTailwind=h-8&amp;bgTailwind=bg-white&amp;footer=svead.vercel.app&amp;footerTailwind=text-teal-600"
	/>
</head>
```
