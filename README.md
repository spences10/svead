# Svead - Svelte Head Component

Svead, a component that allows you to set head meta information,
canonical, title, Twitter and Facebook Open Graph tags.

## Props

It takes the following props:

**Required props**

- `title` => page title
- `description` => page description
- `url` => Full URL of the current page

**Optional props**

- `authorName` => Author Name
- `image` => Open Graph image for use in Twitter, Facebook, etc.
- `paymentPointer` => Web Monetisation Payment pointer
- `website` => Website URL for use in Twitter metatag content.

## Use it

```bash
npm install svead
```

Import it into your Svelte pages and use:

```svelte
<script>
  import { page } from '$app/stores'
  import { Head } from 'svead'

  let title = 'This is Svead a Svelte Head Component'
  let description =
    'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.'
  let url = $page.url.toString()
</script>

<Head {title} {description} {image} {url} />
```

## Developing locally

If you have cloned this locally and are making changes to the
component, install it locally (`link:package`) with:

```bash
# package with sveltkit
pnpm run package
# install local package
pnpm i -D ./package
# orr use the script
pnpm package:local
```
