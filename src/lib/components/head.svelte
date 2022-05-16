<script lang="ts">
  // required props
  export let url: string // Full URL of the current page
  export let title: string // page title
  export let description: string // page description
  // optional props
  export let website: string = '' // website URL
  export let authorName: string = '' // Author Name
  export let image: string = '' // Open Graph image
  export let paymentPointer: string = '' // Web Monetisation Payment pointer
</script>

<!-- 
  Ahrefs guidance:
  - Generally recommended <title> length is between 50 and 60 characters  
  - A general recommendation today is to keep your page <description> between 110 and 160 characters
-->

<svelte:head>
  <link rel="canonical" href={url} />
  <!-- Meta Tags Generated with the help of
     https://heymeta.com 
     https://metatags.io/
  -->

  <!-- HTML Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta name="author" content={authorName} />

  <!-- Google / Search Engine Tags -->
  {#if image.length > 0}
    <meta itemprop="name" content={title} />
    <meta itemprop="description" content={description} />
    <meta itemprop="image" content={image} />
  {/if}

  <!-- Facebook Meta Tags -->
  {#if image.length > 0}
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
  {/if}

  <!-- Twitter Meta Tags -->
  {#if image.length > 0}
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content={website} />
    <meta property="twitter:url" content={url} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  {/if}

  <!-- Monetisation -->
  <!-- https://webmonetization.org/docs/uphold/ -->
  {#if paymentPointer.length > 0}
    <meta name="monetization" content={paymentPointer} />
  {/if}
</svelte:head>
