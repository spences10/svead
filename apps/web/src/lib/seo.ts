import type { SchemaOrgProps, SeoConfig } from 'svead';
import { share_card_url, site } from './config.js';
import {
	groups,
	href_of,
	pages,
	type DocPage,
} from './docs/pages.js';

type Schema = Extract<SchemaOrgProps['schema'], unknown[]>;

export interface PageSeo {
	/** Without the site name, which is added to every page but home */
	title: string;
	description: string;
	/** From the root, e.g. `/faq`. `/` is the home page */
	path: string;
	/** The page's card in static/og, without the extension */
	card: string;
	card_alt: string;
}

// Pages are prerendered, so URLs are built from the production origin
// and not from the request
const absolute = (path: string) =>
	path === '/' ? `${site.url}/` : `${site.url}${path}`;

/** Everything svead's Head needs, the per-page parts filled in */
export function seo_config(page: PageSeo): SeoConfig {
	return {
		title:
			page.path === '/' ? page.title : `${page.title} | ${site.name}`,
		description: page.description,
		url: absolute(page.path),
		// twitter:domain, so the host rather than the origin
		website: new URL(site.url).host,
		language: 'en_GB',
		site_name: site.name,
		author_name: site.author.name,
		twitter_handle: site.author.twitter,
		twitter_card_type: 'summary_large_image',
		open_graph_image: share_card_url(page.card),
		open_graph_image_alt: page.card_alt,
	};
}

const author = {
	'@type': 'Person',
	name: site.author.name,
	url: site.author.url,
} as const;

// In every page's graph, so the articles' isPartOf has a target
const website_id = `${site.url}/#website`;

const website = {
	'@type': 'WebSite',
	'@id': website_id,
	name: site.name,
	url: `${site.url}/`,
	description: site.description,
	inLanguage: 'en-GB',
	author,
} as const;

/** The trail to a page, home first. Each crumb is a name and a path */
function breadcrumbs(...crumbs: [name: string, path: string][]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [['Home', '/'] as const, ...crumbs].map(
			([name, path], index) => ({
				'@type': 'ListItem' as const,
				position: index + 1,
				name,
				item: absolute(path),
			}),
		),
	} as const;
}

export const home_seo: PageSeo = {
	title: 'Svead: Svelte Head and Schema.org components',
	description: site.description,
	path: '/',
	card: 'home',
	card_alt:
		'Put a proper <Head /> on every page. Svead, with a pint of mead whose foam is labelled head.',
};

/** The site, the library's source and the list of docs pages */
export function home_schema(): Schema {
	return [
		website,
		{
			'@type': 'SoftwareSourceCode',
			name: site.package,
			description: site.description,
			url: `${site.url}/`,
			codeRepository: site.repo,
			programmingLanguage: ['Svelte', 'TypeScript'],
			runtimePlatform: 'SvelteKit',
			license: 'https://opensource.org/licenses/MIT',
			author,
		},
		{
			'@type': 'ItemList',
			name: `${site.name} documentation`,
			numberOfItems: pages.length,
			itemListElement: pages.map((page, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: page.title,
				url: absolute(href_of(page)),
			})),
		},
	];
}

export function doc_seo(doc: DocPage): PageSeo {
	return {
		title: doc.title,
		description: `${doc.description}. Documentation for Svead, the Svelte Head and Schema.org components.`,
		path: href_of(doc),
		card: doc.slug,
		card_alt: `${doc.title}. ${doc.description}.`,
	};
}

export function doc_schema(doc: DocPage): Schema {
	const page = doc_seo(doc);
	const group = groups.find(({ id }) => id === doc.group)!;

	return [
		website,
		{
			'@type': 'TechArticle',
			headline: page.title,
			description: page.description,
			url: absolute(page.path),
			image: share_card_url(page.card),
			inLanguage: 'en-GB',
			about: 'The svead Svelte components, Head and SchemaOrg',
			author,
			isPartOf: { '@id': website_id },
		},
		breadcrumbs(
			// Groups are sections of the home page
			[group.label, `/#tap-${group.id}`],
			[page.title, page.path],
		),
	];
}
