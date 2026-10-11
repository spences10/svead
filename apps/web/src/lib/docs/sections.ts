import { sections_of, type DocSection } from './pages.js';

const sources = import.meta.glob<string>('../copy/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
});

/** Each page's `##` headings, keyed by slug, for the command palette */
export const sections: Record<string, DocSection[]> =
	Object.fromEntries(
		Object.entries(sources).map(([path, markdown]) => [
			path.slice(path.lastIndexOf('/') + 1, -'.md'.length),
			sections_of(markdown),
		]),
	);
