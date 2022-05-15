<script lang="ts">
  export let name: string
  export let website: string
  export let title: string
  export let description: string
  export let image: string
  export let url: string
  export let paymentPointer: string
</script>

<!-- 
  Ahrefs guidance:
  - Generally recommended <title> length is between 50 and 60 characters  
  - A general recommendation today is to keep your page <description> between 110 and 160 characters
-->

<svelte:head>
  <link rel="canonical" href={url} />
  <!-- Meta Tags Generated via https://heymeta.com -->

  <!-- HTML Meta Tags -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content={name} />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content={title} />
  <meta itemprop="description" content={description} />
  <meta itemprop="image" content={image} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={website} />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <!-- Monetisation -->
  <meta name="monetization" content={paymentPointer} />
</svelte:head>
