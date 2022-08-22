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

<h1>Welcome to Svead</h1>
<p>
  Visit <a href="https://github.com/spences10/svead">GitHub</a> to contrubute
  to this project.
</p>
<p>View source to see all the head goodness.</p>
