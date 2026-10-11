## Install and use

Add the package:

```bash
pnpm add -D svead
```

Then build a config for the page and hand it to `Head`. Add
`SchemaOrg` when you want structured data too:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import {
		Head,
		SchemaOrg,
		type SeoConfig,
		type SchemaOrgProps,
	} from 'svead';

	const seo_config: SeoConfig = {
		title: 'My Blog Post',
		description: 'This is an example blog post using Svead.',
		url: page.url.href,
		author_name: 'John Doe',
		site_name: 'My Awesome Blog',
	};

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'BlogPosting',
		headline: seo_config.title,
		description: seo_config.description,
		author: {
			'@type': 'Person',
			name: seo_config.author_name,
		},
		datePublished: new Date().toISOString(),
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />

<article>
	<h1>{seo_config.title}</h1>
	<p>{seo_config.description}</p>
	<!-- Rest of your blog post content -->
</article>
```
