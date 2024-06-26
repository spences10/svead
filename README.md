# Svead 🍺 - Svelte Head Component

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![MadeWithSvelte.com shield](https://madewithsvelte.com/storage/repo-shields/4099-shield.svg)](https://madewithsvelte.com/p/svead/shield-link)

[![Tests: E2E](https://github.com/spences10/svead/actions/workflows/e2e-ci.yml/badge.svg)](https://github.com/spences10/svead/actions/workflows/e2e-ci.yml)

[![Tests: Unit](https://github.com/spences10/svead/actions/workflows/unit-test.yml/badge.svg)](https://github.com/spences10/svead/actions/workflows/unit-test.yml)

Svead, a component that allows you to set head meta information,
canonical, title, Twitter and Facebook Open Graph tags.

Also supports JSON-LD for SEO.

![svead](.github/svead.svg)

## Name

The name was meant to be Svelte + Head, but I like Puru's suggestion
of Svelte + Mead

## v0.0.4 vs v1

v1 is currently available via `pnpm i -D svead@next` and will be that
way until Svelte 5 comes out of RC phase.

v1 has changed compared to v0.0.4. The main change is that the there's
only one config object now with `SeoConfig` as the type. This is
because the `schema_org_*` props are now optional and can be set
directly on the `SeoConfig` object.

## Props

It takes the following props:

### `SeoConfig` Props

| Property                         | Type                      | Description                                                        | Required |
| -------------------------------- | ------------------------- | ------------------------------------------------------------------ | -------- |
| `title`                          | `string`                  | The title of the web page.                                         | Yes      |
| `description`                    | `string`                  | A description of the web page.                                     | Yes      |
| `url`                            | `string`                  | The URL of the web page.                                           | Yes      |
| `website`                        | `string`                  | The website the web page belongs to.                               | No       |
| `language`                       | `string` \| `'en'`        | The language of the web page. Defaults to 'en'.                    | No       |
| `open_graph_image`               | `string`                  | The URL of an image to use for Open Graph meta tags.               | No       |
| `payment_pointer`                | `string`                  | A payment pointer for Web Monetisation.                            | No       |
| `author_name`                    | `string`                  | The name of the author.                                            | No       |
| `author_type`                    | `AuthorType`              | The type of the author, either 'Person' or 'Organization'.         | No       |
| `author_url`                     | `string`                  | A URL for the author.                                              | No       |
| `date_published`                 | `string`                  | The date the content was published.                                | No       |
| `date_modified`                  | `string`                  | The date the content was last modified.                            | No       |
| `publisher_name`                 | `string`                  | The name of the publisher.                                         | No       |
| `publisher_url`                  | `string`                  | A URL for the publisher.                                           | No       |
| `publisher_logo`                 | `string`                  | A URL for the publisher's logo.                                    | No       |
| `same_as`                        | `string[]`                | An array of URLs for the Schema.org sameAs property.               | No       |
| `schema_org_search_url_template` | `string`                  | A URL template for the Schema.org potentialAction search property. | No       |
| `schema_org_article`             | `SchemaOrgArticle`        | A SchemaOrgArticle object.                                         | No       |
| `schema_org_website`             | `SchemaOrgWebsite`        | A SchemaOrgWebsite object.                                         | No       |
| `schema_org_webpage`             | `SchemaOrgWebPage`        | A SchemaOrgWebPage object.                                         | No       |
| `schema_org_entity`              | `SchemaOrgEntity`         | A SchemaOrgEntity object.                                          | No       |
| `schema_org_publisher`           | `SchemaOrgPublisher`      | A SchemaOrgPublisher object.                                       | No       |
| `schema_org_image_object`        | `SchemaOrgImageObject`    | A SchemaOrgImageObject.                                            | No       |
| `schema_org_breadcrumb_list`     | `SchemaOrgBreadcrumbList` | A SchemaOrgBreadcrumbList object.                                  | No       |

## JSON-LD Properties

The following tables lists the JSON-LD properties supported by
'svead'. These properties help you structure your metadata in a way
that is recognized by search engines, enhancing your SEO and the way
your content is understood and presented in search results.

### `schema_org_search_url_template`

| Property                         | Type     | Description                                                        | Required |
| -------------------------------- | -------- | ------------------------------------------------------------------ | -------- |
| `schema_org_search_url_template` | `string` | A URL template for the Schema.org potentialAction search property. | No       |

### `SchemaOrgArticle` Properties

| Property           | Type               | Description                                | Required |
| ------------------ | ------------------ | ------------------------------------------ | -------- |
| `@type`            | `'Article'`        | The type of the object. Must be 'Article'. | Yes      |
| `isPartOf`         | `Identifiable`     | The parent object this article is part of. | Yes      |
| `author`           | `Identifiable`     | The author of the article.                 | Yes      |
| `headline`         | `string`           | The headline of the article.               | Yes      |
| `datePublished`    | `Date` \| `string` | The date the article was published.        | Yes      |
| `dateModified`     | `Date` \| `string` | The date the article was last modified.    | Yes      |
| `mainEntityOfPage` | `Identifiable`     | The main entity described in the article.  | Yes      |
| `publisher`        | `Identifiable`     | The publisher of the article.              | Yes      |
| `image`            | `Identifiable`     | An image that represents the article.      | Yes      |
| `articleSection`   | `string[]`         | The sections the article belongs to.       | Yes      |
| `inLanguage`       | `string`           | The language of the article.               | Yes      |

### `SchemaOrgWebsite` Properties

| Property          | Type             | Description                                           | Required |
| ----------------- | ---------------- | ----------------------------------------------------- | -------- |
| `@type`           | `'WebSite'`      | The type of the object. Must be 'WebSite'.            | Yes      |
| `url`             | `string`         | The URL of the website.                               | Yes      |
| `name`            | `string`         | The name of the website.                              | Yes      |
| `description`     | `string`         | A description of the website.                         | Yes      |
| `publisher`       | `Identifiable`   | The publisher of the website.                         | Yes      |
| `potentialAction` | `SearchAction[]` | An array of potential search actions for the website. | Yes      |
| `inLanguage`      | `string`         | The language of the website.                          | Yes      |

### `SchemaOrgWebPage` Properties

| Property             | Type               | Description                                          | Required |
| -------------------- | ------------------ | ---------------------------------------------------- | -------- |
| `@type`              | `'WebPage'`        | The type of the object. Must be 'WebPage'.           | Yes      |
| `url`                | `string`           | The URL of the web page.                             | Yes      |
| `name`               | `string`           | The name of the web page.                            | Yes      |
| `isPartOf`           | `Identifiable`     | The parent website the web page is part of.          | Yes      |
| `primaryImageOfPage` | `Identifiable`     | The primary image of the web page.                   | Yes      |
| `datePublished`      | `Date` \| `string` | The date the web page was published.                 | Yes      |
| `dateModified`       | `Date` \| `string` | The date the web page was last modified.             | Yes      |
| `author`             | `Identifiable`     | The author of the web page.                          | Yes      |
| `description`        | `string`           | A description of the web page.                       | Yes      |
| `breadcrumb`         | `Identifiable`     | The breadcrumb for the web page.                     | Yes      |
| `inLanguage`         | `string`           | The language of the web page.                        | Yes      |
| `potentialAction`    | `ReadAction[]`     | An array of potential read actions for the web page. | Yes      |

### `SchemaOrgEntity` Properties

| Property | Type                   | Description                                      | Required |
| -------- | ---------------------- | ------------------------------------------------ | -------- |
| `@type`  | `MainEntityType[]`     | An array of types for the entity.                | Yes      |
| `@id`    | `string`               | A unique identifier for the entity.              | Yes      |
| `name`   | `string`               | The name of the entity.                          | Yes      |
| `image`  | `SchemaOrgImageObject` | An image that represents the entity.             | Yes      |
| `logo`   | `Identifiable`         | A logo associated with the entity.               | Yes      |
| `sameAs` | `string[]`             | An array of URLs that also represent the entity. | Yes      |

### `SchemaOrgPublisher` Properties

| Property | Type                   | Description                                         | Required |
| -------- | ---------------------- | --------------------------------------------------- | -------- |
| `@type`  | `MainEntityType[]`     | An array of types for the publisher.                | Yes      |
| `name`   | `string`               | The name of the publisher.                          | Yes      |
| `image`  | `SchemaOrgImageObject` | An image that represents the publisher.             | Yes      |
| `logo`   | `Identifiable`         | A logo associated with the publisher.               | Yes      |
| `sameAs` | `string[]`             | An array of URLs that also represent the publisher. | Yes      |

### `SchemaOrgImageObject` Properties

| Property     | Type            | Description                                    | Required |
| ------------ | --------------- | ---------------------------------------------- | -------- |
| `@type`      | `'ImageObject'` | The type of the object. Must be 'ImageObject'. | Yes      |
| `@id`        | `string`        | A unique identifier for the image.             | Yes      |
| `inLanguage` | `string`        | The language of the image.                     | Yes      |
| `url`        | `string`        | The URL of the image.                          | Yes      |
| `contentUrl` | `string`        | An alternative URL for the image.              | No       |
| `width`      | `number`        | The width of the image in pixels.              | Yes      |
| `height`     | `number`        | The height of the image in pixels.             | Yes      |
| `caption`    | `string`        | A caption describing the image.                | Yes      |

### `SchemaOrgBreadcrumbList` Properties

| Property          | Type               | Description                                               | Required |
| ----------------- | ------------------ | --------------------------------------------------------- | -------- |
| `@type`           | `'BreadcrumbList'` | The type of the object. Must be 'BreadcrumbList'.         | Yes      |
| `itemListElement` | `ListItem[]`       | An array of list items representing the breadcrumb trail. | Yes      |

### `ListItem` Properties

| Property   | Type                                            | Description                                 | Required |
| ---------- | ----------------------------------------------- | ------------------------------------------- | -------- |
| `@type`    | `'ListItem'`                                    | The type of the object. Must be 'ListItem'. | Yes      |
| `position` | `number`                                        | The position of the item in the list.       | Yes      |
| `item`     | `Identifiable & { name: string; url: string; }` | The item represented by this list node.     | Yes      |

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
# change to package directory
cd packages/svead
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
# change to package directory
cd packages/svead
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
