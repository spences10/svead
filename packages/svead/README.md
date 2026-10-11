# Svead 🍺

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![MadeWithSvelte.com shield](https://madewithsvelte.com/storage/repo-shields/4099-shield.svg)](https://madewithsvelte.com/p/svead/shield-link)

[![Tests: E2E](https://github.com/spences10/svead/actions/workflows/e2e-ci.yml/badge.svg)](https://github.com/spences10/svead/actions/workflows/e2e-ci.yml)

[![Tests: Unit](https://github.com/spences10/svead/actions/workflows/unit-test.yml/badge.svg)](https://github.com/spences10/svead/actions/workflows/unit-test.yml)

**Put a proper `<Head />` on every page.**

Svead is two Svelte components. `Head` sets your title, canonical,
Open Graph and Twitter tags. `SchemaOrg` adds JSON-LD structured data.

**[Read the docs at svead.pages.dev](https://svead.pages.dev)**

[![Svead: put a proper Head on every page](https://svead.pages.dev/og/home.png)](https://svead.pages.dev)

## Name

The name was meant to be Svelte + Head, but I like Puru's suggestion
of Svelte + Mead, hence the pint.

## Use it

```bash
pnpm add -D svead
```

Svead needs Svelte 5. If you're still on Svelte 4, stay on
`svead@0.0.9`, which has the older API with one prop per tag.

Build a config for the page and hand it to `Head`. Add `SchemaOrg`
when you want structured data too:

```svelte
<script lang="ts">
	import { Head, SchemaOrg } from 'svead';
	import type { SeoConfig, SchemaOrgProps } from 'svead';

	const seo_config: SeoConfig = {
		title: 'Welcome to My Site',
		description: 'This is a simple web page example.',
		url: 'https://example.com/welcome',
	};

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		name: 'Welcome to My Site',
		description: 'This is a simple web page example.',
		url: 'https://example.com/welcome',
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />

<h1>Welcome to My Site</h1>
<p>This is a simple web page example.</p>
```

## Props

It takes the following props:

### `SeoConfig` Props

| Property               | Type     | Description                                                  | Required |
| :--------------------- | :------- | :----------------------------------------------------------- | :------- |
| `title`                | `string` | The title of the web page.                                   | Yes      |
| `description`          | `string` | A description of the web page.                               | Yes      |
| `url`                  | `string` | The URL of the web page.                                     | Yes      |
| `website`              | `string` | The website the web page belongs to.                         | No       |
| `language`             | `string` | The locale for `og:locale`, e.g. `en_GB`. Omitted if unset.  | No       |
| `open_graph_image`     | `string` | The URL of an image to use for Open Graph meta tags.         | No       |
| `payment_pointer`      | `string` | A payment pointer for Web Monetization.                      | No       |
| `author_name`          | `string` | The name of the author.                                      | No       |
| `site_name`            | `string` | The name of the site for og:site_name.                       | No       |
| `twitter_handle`       | `string` | The Twitter handle of the content creator or site.           | No       |
| `twitter_card_type`    | `string` | The type of Twitter card. Defaults to 'summary_large_image'. | No       |
| `open_graph_image_alt` | `string` | Alt text for the Open Graph image. Defaults to the title.    | No       |

## SchemaOrg Component

The SchemaOrg component allows you to add structured data to your web
pages using JSON-LD format. This helps search engines better
understand your content and can potentially improve your site's
appearance in search results.

### Usage

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'BlogPosting',
		headline: 'My First Blog Post',
		description: 'This is an example of a blog post using svead.',
		author: {
			'@type': 'Person',
			name: 'John Doe',
		},
		datePublished: '2023-08-22T10:00:00Z',
	};
</script>

<SchemaOrg schema={schema_org} />
```

### `SchemaOrgProps` Props

| Property | Type                     | Description                                                    | Required |
| :------- | :----------------------- | :------------------------------------------------------------- | :------- |
| `schema` | `SchemaOrgType` or array | The structured data object(s) following schema.org vocabulary. | Yes      |

### `SchemaOrgType`

`SchemaOrgType` is a union type that includes:

- `Thing`: Represents the most generic type of item in schema.org.
- `WithContext<Thing>`: A Thing with an added `@context` property.
- `Graph`: A JSON-LD graph with `@context` and `@graph`.

You can use any valid schema.org type as defined in the
[schema.org documentation](https://schema.org).

### Additional Notes:

- The `@context` property is automatically added by the component if
  not provided.
- Passing an array renders a single JSON-LD `@graph` with one shared
  `https://schema.org` context.
- You can also include related schema types by nesting them within the
  main schema object.
- Always validate your structured data using tools like
  [Google's Rich Results Test](https://search.google.com/test/rich-results)
  to ensure it's correctly formatted.

### Example with Multiple Schema Types

```svelte
<script lang="ts">
	import { SchemaOrg, type SchemaOrgProps } from 'svead';

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		name: 'My Blog Post',
		description: 'An example blog post with structured data',
		mainEntity: {
			'@type': 'BlogPosting',
			headline: 'My First Blog Post',
			author: {
				'@type': 'Person',
				name: 'John Doe',
			},
			datePublished: '2023-08-22T10:00:00Z',
		},
	};
</script>

<SchemaOrg schema={schema_org} />
```

## Documentation

- [Quick reference](https://svead.pages.dev/quick-reference): install,
  basic usage and a cheatsheet
- [Components](https://svead.pages.dev/components): every option for
  `Head` and `SchemaOrg`
- [Common schema types](https://svead.pages.dev/schema-types-content)
  and
  [more schema types](https://svead.pages.dev/schema-types-specialty)
- [Real-world patterns](https://svead.pages.dev/real-world-patterns),
  [type safety with schema-dts](https://svead.pages.dev/schema-dts)
  and [advanced patterns](https://svead.pages.dev/advanced-patterns)
- [Best practices](https://svead.pages.dev/best-practices),
  [FAQ](https://svead.pages.dev/faq) and
  [troubleshooting](https://svead.pages.dev/troubleshooting)

## Developing locally

This is a pnpm workspace: the package is in `packages/svead` and the
docs site in `apps/web`.

```bash
pnpm install
# run the docs site against the local package
pnpm run dev:web
# format, lint and type check
pnpm run check
# unit tests
pnpm run test:ci
```

Each docs page is a Markdown file in `apps/web/src/lib/copy` with an
entry in `apps/web/src/lib/docs/pages.ts`. After adding or renaming a
page, run `pnpm run share-cards` in `apps/web` to render its link
preview image.

## Releasing

Scott, this is here for you to remember how to do this 🙃

Releases are manual and use changesets:

```bash
# describe the change (once per change, commit the file it writes)
pnpm changeset
# bump the version and write the changelog
pnpm run version
# build and publish to npm
pnpm run release
# push the tags
git push --follow-tags
```

## pnpm workspaces

To add the `svead` package to the `web` workspace:

```bash
pnpm add -D svead --filter web
```

## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://scottspence.com/"><img src="https://avatars.githubusercontent.com/u/234708?v=4?s=100" width="100px;" alt="Scott Spence"/><br /><sub><b>Scott Spence</b></sub></a><br /><a href="https://github.com/spences10/svead/commits?author=spences10" title="Code">💻</a> <a href="https://github.com/spences10/svead/commits?author=spences10" title="Documentation">📖</a> <a href="#example-spences10" title="Examples">💡</a> <a href="#maintenance-spences10" title="Maintenance">🚧</a> <a href="https://github.com/spences10/svead/commits?author=spences10" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
