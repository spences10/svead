export const site = {
	name: 'Svead',
	package: 'svead',
	url: 'https://svead.pages.dev',
	description:
		'Svead is a pair of Svelte components: Head sets the title, canonical, Open Graph and Twitter tags, and SchemaOrg adds JSON-LD structured data.',
	repo: 'https://github.com/spences10/svead',
	npm: 'https://www.npmjs.com/package/svead',
	// Made by `pnpm run share-cards`, one per page in static/og
	share_card: { width: 1200, height: 630 },
	author: {
		name: 'Scott Spence',
		url: 'https://scottspence.com',
	},
};

/** The link-preview card for a page, named as in static/og */
export const share_card_url = (name: string) =>
	`${site.url}/og/${name}.png`;
