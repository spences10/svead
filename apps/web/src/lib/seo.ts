import type { SchemaOrgProps, SeoConfig } from 'svead';
import { share_card_url, site } from './config.js';
import {
	groups,
	href_of,
	pages,
	type DocPage,
} from './docs/pages.js';

type Schema = SchemaOrgProps['schema'];

const author = {
	'@type': 'Person' as const,
	name: site.author.name,
	url: site.author.url,
};

/**
 * What every page shares, with the page's own title and description.
 * `url` is built from the production origin: pages are prerendered,
 * so the request URL isn't the one visitors will be on.
 */
export function seo_config(
	page: { title: string; description: string; card: string },
	url: string,
): SeoConfig {
	return {
		title: page.title,
		description: page.description,
		url,
		website: new URL(site.url).host,
		site_name: site.name,
		author_name: site.author.name,
		language: 'en_GB',
		open_graph_image: share_card_url(page.card),
		open_graph_image_alt: `${page.title}, on a card with a pint of mead whose foam is labelled head`,
	};
}

export function home_schema(): Schema {
	return [
		{
			'@type': 'WebSite',
			name: site.name,
			url: site.url,
			description: site.description,
			author,
		},
		{
			'@type': 'SoftwareSourceCode',
			name: site.package,
			description: site.description,
			codeRepository: site.repo,
			programmingLanguage: ['Svelte', 'TypeScript'],
			license: 'https://opensource.org/licenses/MIT',
			author,
		},
		{
			'@type': 'ItemList',
			name: `${site.name} documentation`,
			itemListElement: pages.map((page, index) => ({
				'@type': 'ListItem' as const,
				position: index + 1,
				name: page.title,
				url: `${site.url}${href_of(page)}`,
			})),
		},
	];
}

export function doc_schema(page: DocPage): Schema {
	const url = `${site.url}${href_of(page)}`;
	const group = groups.find((group) => group.id === page.group)!;

	return [
		{
			'@type': 'TechArticle',
			headline: page.title,
			description: page.description,
			url,
			author,
			isPartOf: {
				'@type': 'WebSite',
				name: site.name,
				url: site.url,
			},
		},
		{
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: site.name,
					item: site.url,
				},
				{ '@type': 'ListItem', position: 2, name: group.label },
				{
					'@type': 'ListItem',
					position: 3,
					name: page.title,
					item: url,
				},
			],
		},
	];
}
