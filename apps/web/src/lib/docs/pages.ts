import GithubSlugger from 'github-slugger';

export type GroupId = 'start' | 'schema' | 'advanced' | 'help';

export interface DocPage {
	/** The route, and the Markdown file in `src/lib/copy` */
	slug: string;
	title: string;
	description: string;
	group: GroupId;
	/** Extra terms the palette matches on */
	keywords: string[];
}

export interface DocSection {
	title: string;
	/** As rehype-slug writes it on the heading */
	id: string;
}

export const groups: { id: GroupId; label: string }[] = [
	{ id: 'start', label: 'Getting started' },
	{ id: 'schema', label: 'Schema types' },
	{ id: 'advanced', label: 'Advanced usage' },
	{ id: 'help', label: 'Best practices and help' },
];

/** In reading order, which is also the previous and next order */
export const pages: DocPage[] = [
	{
		slug: 'quick-reference',
		title: 'Quick reference',
		description: 'Install, basic usage and a cheatsheet',
		group: 'start',
		keywords: ['install', 'setup', 'pnpm', 'npm', 'cheatsheet'],
	},
	{
		slug: 'components',
		title: 'Components',
		description: 'Every option for Head and SchemaOrg',
		group: 'start',
		keywords: ['head', 'schemaorg', 'props', 'seo_config', 'api'],
	},
	{
		slug: 'schema-types-content',
		title: 'Common schema types',
		description:
			'WebPage, BlogPosting, NewsArticle, Article and BreadcrumbList',
		group: 'schema',
		keywords: ['json-ld', 'structured data', 'blog', 'breadcrumbs'],
	},
	{
		slug: 'schema-types-specialty',
		title: 'More schema types',
		description:
			'FAQ, Product, Recipe, Event, HowTo, Video and Course',
		group: 'schema',
		keywords: ['json-ld', 'structured data', 'ecommerce', 'faqpage'],
	},
	{
		slug: 'real-world-patterns',
		title: 'Real-world patterns',
		description: 'Default configs, helpers and reusable schemas',
		group: 'advanced',
		keywords: ['defaults', 'helper', 'open graph image', 'person'],
	},
	{
		slug: 'schema-dts',
		title: 'Type safety with schema-dts',
		description: 'Typed schemas that fail at compile time',
		group: 'advanced',
		keywords: ['typescript', 'types', 'withcontext', 'type guard'],
	},
	{
		slug: 'advanced-patterns',
		title: 'Advanced patterns',
		description: '@graph, mainEntity and potentialAction',
		group: 'advanced',
		keywords: ['graph', 'multiple schemas', 'search action'],
	},
	{
		slug: 'best-practices',
		title: 'Best practices',
		description: 'Dates, images, validation and card types',
		group: 'help',
		keywords: ['tips', 'language', 'locale', 'monetization'],
	},
	{
		slug: 'faq',
		title: 'FAQ',
		description: 'Short answers to the usual questions',
		group: 'help',
		keywords: ['questions', 'canonical', 'twitter card', 'ssr'],
	},
	{
		slug: 'troubleshooting',
		title: 'Troubleshooting',
		description: 'Missing images, type errors and duplicate tags',
		group: 'help',
		keywords: ['errors', 'debug', 'validation', 'context'],
	},
];

export const pages_in = (group: GroupId) =>
	pages.filter((page) => page.group === group);

export const page_for = (slug: string) =>
	pages.find((page) => page.slug === slug);

export const href_of = (page: DocPage) => `/${page.slug}`;

/** The pages either side of `slug` in reading order */
export function neighbours(slug: string) {
	const index = pages.findIndex((page) => page.slug === slug);
	return {
		previous: index > 0 ? pages[index - 1] : undefined,
		next: index >= 0 ? pages[index + 1] : undefined,
	};
}

/**
 * The `##` headings in a page's Markdown, with the ids rehype-slug
 * gives them. Every heading goes through the slugger, as it does at
 * build time, so duplicates are numbered the same way.
 */
export function sections_of(markdown: string): DocSection[] {
	const slugger = new GithubSlugger();
	const sections: DocSection[] = [];
	let in_fence = false;

	for (const line of markdown.split('\n')) {
		if (line.trimStart().startsWith('```')) {
			in_fence = !in_fence;
			continue;
		}
		if (in_fence) continue;

		const heading = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
		if (!heading) continue;

		const title = heading[2].replaceAll('`', '');
		const id = slugger.slug(title);
		if (heading[1].length === 2) sections.push({ title, id });
	}

	return sections;
}
