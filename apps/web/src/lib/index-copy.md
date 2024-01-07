# Welcome to Svead

The Svelte Head Component.

Svead is a dynamic component that enhances your SEO by allowing you to set head meta information, canonical, title, Twitter, and Facebook Open Graph tags effortlessly.

Visit [GitHub](https://github.com/spences10/svead) to contribute to this project.

View source (`Ctrl+u` or `⌘+⌥+u` on macOS) to see all the head goodness in action.

Yes, it's `<svelte:head>` with props being passed to it!

Having implemented this in several projects with repetitive code, I decided to package it up for broader use.

## Props

It takes the following props:

**Required props**

```ts
url: string; // Full URL of the current page
title: string; // Page title
description: string; // Page description
```

**Optional props**

```ts
website: string = ''; // Website URL
authorName: string = ''; // Author Name
image: string = ''; // Open Graph image
paymentPointer: string = ''; // Web Monetisation Payment pointer
```

## Use it

```bash
pnpm i -D svead
```

Import it into your Svelte pages and use:

```svelte
<script>
  import { page } from '$app/stores';
  import { Head } from 'svead';

  let title = 'This is Svead a Svelte Head Component';
  let image = `https://og.tailgraph.com/og?fontFamily=Roboto&title=This+is+Svead&titleTailwind=text-gray-800+font-bold+text-6xl&text=Set+Head+meta+tag+information&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=svead.vercel.app&footerTailwind=text-teal-600`;
  let description =
    'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.';
  let url = $page.url.toString();
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
  <!-- additional tags truncated for brevity -->
</head>
```

## Example Routes

Explore how Svead works with different content types:

- [Article](/article)
- [Blog Posting](/blog-posting)
- [News Article](/news-article)
- [Web Page](/web-page)

## Advanced Examples

Delve deeper into the capabilities of Svead with these advanced use cases:

### Breadcrumbs

Learn how to implement breadcrumbs for enhanced navigation and SEO.

```svelte
<script>
  // Example code for breadcrumbs
</script>
```

For more information and full documentation, visit the [Svead GitHub repository](https://github.com/spences10/svead).

### Breadcrumbs Implementation

Breadcrumbs are a great way to enhance user navigation and SEO by providing a clear path back to previous pages. Here's how you can implement breadcrumbs with Svead:

First, you'll need to define your breadcrumb structure. This is typically an array of objects, each representing a step in the path.

```javascript
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Articles', url: '/articles' },
  // The current page
  { name: 'Current Article', url: '/articles/current-article' }
];
```

Next, incorporate the breadcrumb data into the Svead component within your Svelte page:

```svelte
<script>
  import { Head } from 'svead';

  const title = 'Current Article - My Awesome Site';
  const description = 'This is an article about something really interesting.';
  const url = 'https://www.myawesomesite.com/articles/current-article';
  const image = 'https://www.myawesomesite.com/path/to/image.jpg';

  // Define breadcrumbs as shown above
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/articles' },
    { name: 'Current Article', url: '/articles/current-article' }
  ];
</script>

<Head {title} {description} {image} {url} breadcrumbs={breadcrumbs} />
```

Finally, you'll need to ensure that Svead is set up to handle the `breadcrumbs` prop and render the appropriate JSON-LD structured data. Here's an example of what that might look like in your Svead component:

```javascript
// Inside your Svead component
function generateBreadcrumbJSONLD(breadcrumbs) {
  const itemListElement = breadcrumbs.map((breadcrumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": breadcrumb.name,
    "item": breadcrumb.url
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
}

// Inside the <script> tag
export let breadcrumbs = [];

$: breadcrumbJSONLD = breadcrumbs.length
  ? generateBreadcrumbJSONLD(breadcrumbs)
  : null;
```

Remember to include the generated JSON-LD data in the head of your document. This will provide search engines with the structured data they need to understand the breadcrumb trail for your page.

By following these steps, you should have a fully functional breadcrumb system integrated with your Svead component, enhancing both navigation and SEO for your site.
