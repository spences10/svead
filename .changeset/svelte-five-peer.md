---
'svead': minor
---

Require Svelte 5 and tidy what the package ships.

**Breaking:** the peer dependency is now `svelte@^5.0.0`. Every
release since 0.0.10 has shipped runes (`$props()`), so the old
`^4.0.0 || ^5.0.0` range never worked on Svelte 4. If you are still on
Svelte 4, stay on `svead@0.0.9`.

- `engines.node` is now `>=24.15.0`.
- The `language` option was documented as defaulting to `'en'`. It has
  no default: `og:locale` is only rendered when you set it, and the
  value should be in Open Graph's `language_TERRITORY` format, for
  example `en_GB`.
- `open_graph_image_alt` is now documented.
- The package no longer depends on SvelteKit to build. What is
  published is unchanged.
