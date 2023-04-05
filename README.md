# Svead - Svelte Head Component

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![MadeWithSvelte.com shield](https://madewithsvelte.com/storage/repo-shields/4099-shield.svg)](https://madewithsvelte.com/p/svead/shield-link)

Svead, a component that allows you to set head meta information,
canonical, title, Twitter and Facebook Open Graph tags.

![svead](.github/svead.jpg)

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
npm dist-tag add sveltekit-embed@0.0.13 latest
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
