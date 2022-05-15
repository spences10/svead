<script>
  import { Head } from 'svead'

  let title = 'This is Svead a Svelte Head Component'
  let description =
    'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.'
  let image = ''
  let url = `https://og.tailgraph.com/og
    ?fontFamily=Roboto
    &title=This%20is%20Svead
    &titleTailwind=text-gray-800%20font-bold%20text-6xl
    &text=Set%20Head%20meta%20tag%20information
    &textTailwind=text-gray-700%20text-2xl%20mt-4
    &logoTailwind=h-8
    &bgTailwind=bg-white
    &footer=tailgraph.com
    &footerTailwind=text-teal-600`
  let website = ''
</script>

<Head {title} {description} {image} {url} {website} />

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
  documentation
</p>
