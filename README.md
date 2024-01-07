# Svead - Svelte Head Component

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![MadeWithSvelte.com shield](https://madewithsvelte.com/storage/repo-shields/4099-shield.svg)](https://madewithsvelte.com/p/svead/shield-link)

[![Tests: E2E](https://github.com/spences10/svead/actions/workflows/e2e-ci.yml/badge.svg)](https://github.com/spences10/svead/actions/workflows/e2e-ci.yml)

[![Tests: Unit](https://github.com/spences10/svead/actions/workflows/unit-test.yml/badge.svg)](https://github.com/spences10/svead/actions/workflows/unit-test.yml)

Svead, a component that allows you to set head meta information,
canonical, title, Twitter and Facebook Open Graph tags.

Also supports JSON-LD for SEO.

![svead](.github/svead.jpg)

## Props

It takes the following props:

### `SeoConfig` Props

| Property          | Type             | Description                                                  | Required |
| ----------------- | ---------------- | ------------------------------------------------------------ | -------- |
| `title`           | string           | The title of the page.                                       | Yes      |
| `description`     | string           | A brief description of the page's content.                   | Yes      |
| `url`             | string           | The full URL of the current page.                            | Yes      |
| `language`        | string \| 'en'   | The language for SchemaOrg.                                  | No       |
| `image`           | string           | Open Graph image URL.                                        | No       |
| `website`         | string           | Website URL.                                                 | No       |
| `author_name`     | string           | Author name.                                                 | No       |
| `author_type`     | AuthorType       | Type of the author (Person or Organization).                 | No       |
| `author_url`      | string           | URL of the author's webpage.                                 | No       |
| `date_published`  | string           | Date when the entity was first published in ISO 8601 format. | No       |
| `date_modified`   | string           | Date when the entity was last modified in ISO 8601 format.   | No       |
| `publisher_name`  | string           | Name of the publisher.                                       | No       |
| `publisher_url`   | string           | URL of the publisher.                                        | No       |
| `publisher_logo`  | string           | Logo URL of the publisher.                                   | No       |
| `payment_pointer` | string           | Web Monetisation payment pointer.                            | No       |
| `breadcrumbs`     | BreadcrumbItem[] | Array of breadcrumb items.                                   | No       |
| `main_entity`     | MainEntity       | Main entity of the page.                                     | No       |

## JSON-LD Properties

The following table lists the JSON-LD properties supported by 'svead'.
These properties help you structure your metadata in a way that is
recognized by search engines, enhancing your SEO and the way your
content is understood and presented in search results.

### `AuthorEntity` Props

| Property | Type                       | Description                              | Required |
| -------- | -------------------------- | ---------------------------------------- | -------- |
| `@type`  | 'Person' \| 'Organization' | Type of author (Person or Organization). | Yes      |
| `name`   | string                     | Name of the author.                      | Yes      |
| `url`    | string                     | URL of the author's webpage.             | Yes      |

### `BreadcrumbItem` Props

| Property | Type   | Description             | Required |
| -------- | ------ | ----------------------- | -------- |
| `name`   | string | Name of the breadcrumb. | Yes      |
| `url`    | string | URL of the breadcrumb.  | Yes      |

### `PublisherEntity` Props

| Property | Type           | Description                               | Required |
| -------- | -------------- | ----------------------------------------- | -------- |
| `@type`  | 'Organization' | Type of publisher, always 'Organization'. | Yes      |
| `name`   | string         | Name of the organization.                 | Yes      |
| `logo`   | string         | URL to the logo of the organization.      | Yes      |
| `url`    | string         | URL of the organization. (Optional)       | No       |

### Additional Notes:

- **Refer to Schema Documentation**: For a detailed understanding of
  each property and how it's used in structured data, refer to the
  [schema.org documentation](https://schema.org).
- **Advanced Configuration**: Some properties accept complex objects
  or arrays. Please refer to the respective schema definitions for
  such cases.
- **Best Practices**: Ensure the accuracy and relevance of the
  information provided for each property to maximize SEO benefits.

This table is not exhaustive and may be updated as new properties are
added or existing ones are modified. Stay tuned to the project's
repository for the latest updates.

## Use it

```bash
npm install svead
```

Import it into your Svelte pages and use:

```svelte
<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		url: 'https://example.com/web-page',
		title: 'Web Page',
		description: 'This is a sample web page.',
		date_published: '2023-04-05T10:00:00Z',
		date_modified: '2023-04-05T12:00:00Z',
	};
</script>

<Head {seo_config} />
```

## Managing the `lang` Attribute in `app.html`

The `lang` attribute in your SvelteKit application is crucial for
specifying the primary language of your content. This attribute is
essential for accessibility and SEO, as it helps search engines and
assistive technologies understand the language of your text.

### Default Language Setting

Typically, the `lang` attribute is set in the `app.html` file of your
SvelteKit project. Here's a typical example:

```html
<!doctype html>
<html lang="en">
	<!-- ... other tags ... -->
</html>
```

In this snippet, `lang="en"` sets the language of the document to
English.

### Customizing the Language

To customize the language for your application:

1. **Static Setting:** If your site is primarily in one language,
   simply replace the `en` in `lang="en"` with the appropriate
   language code (e.g., `fr` for French).

2. **Dynamic Setting:** If your site supports multiple languages and
   you need to change the language dynamically based on user
   preferences or other criteria, you'll need to handle this at the
   server level or through client-side scripting. Here are some
   strategies:

- **Server-Side Rendering (SSR):** Adapt your SSR setup to insert the
  correct `lang` attribute based on the request's context or user
  settings.
- **Client-Side Script:** Use client-side JavaScript to set
  `document.documentElement.lang` based on user interaction or other
  indicators. This method is less preferred due to potential SEO and
  user experience implications.

### Note on svead Usage

The svead package is designed to enhance your application's SEO and
accessibility through structured data and other optimizations.
However, managing the `lang` attribute in the `app.html` file is
outside the scope of svead. As such, you'll need to manage this
attribute as part of your general SvelteKit application setup.
Following the best practices for setting the `lang` attribute will
complement the enhancements provided by svead.

## Packaging for NPM

Scott, this is here for you to remember how to do this 🙃

Although I detailed this in
[Making npm Packages with SvelteKit](https://scottspence.com/posts/making-npm-packages-with-sveltekit)
I think it's best to put it here as I always come to the README and
the instructions are never there! 😅

**Publish the project to NPM**

```bash
# authenticate with npm
npm login
# bump version with npm
npm version 0.0.8
# package with sveltekit
pnpm run package
# publish
npm publish
# push tags to github
git push --tags
```

**Publish @next package**

Same procedure except use the `--tag` flag:

```bash
# authenticate with npm
npm login
# bump version with npm
npm version 0.0.13
# package with sveltekit
pnpm run package
# publish with tag
npm publish --tag next
# push tags to github
git push --tags
```

**Move @next package to latest**

```bash
# authenticate with npm
npm login
# move @next to latest
npm dist-tag add svead@0.0.13 latest
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
