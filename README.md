# Svead - Svelte Head Component

Svead, a component that allows you to set head meta information,
canonical, title, Twitter and Facebook Open Graph tags.

Facebook isn't tested, but it should work.

## Developing locally

If you have cloned this locally and are wondering why there's a linter
warning for `svead` that's because you'll need to package and install
the project locally.

```bash
# package with sveltkit
pnpm run package
# install local package
pnpm i -D ./package
# orr use the script
pnpm package:local
```
