import { page_for, pages } from '#lib/docs/pages.js';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	pages.map((page) => ({ slug: page.slug }));

export const load: PageLoad = async ({ params }) => {
	const doc = page_for(params.slug);
	if (!doc) {
		throw error(404, `Documentation page "${params.slug}" not found`);
	}

	const Copy = await import(`../../lib/copy/${doc.slug}.md`);
	return {
		Copy: Copy.default,
		doc,
	};
};
