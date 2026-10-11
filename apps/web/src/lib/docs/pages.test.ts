import { describe, expect, it } from 'vitest';
import {
	groups,
	neighbours,
	page_for,
	pages,
	pages_in,
	sections_of,
} from './pages.js';
import { sections } from './sections.js';

const copy = Object.keys(import.meta.glob('../copy/*.md')).map(
	(path) => path.slice(path.lastIndexOf('/') + 1, -'.md'.length),
);

describe('docs pages', () => {
	it('has an entry for every Markdown page, and a page for every entry', () => {
		// home.md is the home page's own content, not a docs page
		const documented = copy.filter((slug) => slug !== 'home').sort();

		expect(pages.map((page) => page.slug).sort()).toEqual(documented);
	});

	it('puts every page in a group that exists', () => {
		const grouped = groups.flatMap((group) => pages_in(group.id));

		expect(grouped).toHaveLength(pages.length);
	});

	it('finds a page by slug', () => {
		expect(page_for('faq')?.title).toBe('FAQ');
		expect(page_for('nope')).toBeUndefined();
	});

	it('walks the pages in reading order', () => {
		expect(neighbours(pages[0].slug).previous).toBeUndefined();
		expect(neighbours(pages[0].slug).next).toBe(pages[1]);
		expect(neighbours(pages.at(-1)!.slug).next).toBeUndefined();
		expect(neighbours('nope')).toEqual({
			previous: undefined,
			next: undefined,
		});
	});
});

describe('sections_of', () => {
	it('lists the second level headings with their ids', () => {
		const markdown =
			'# Page\n\n## First Part\n\n### Detail\n\n## `Head` Props';

		expect(sections_of(markdown)).toEqual([
			{ title: 'First Part', id: 'first-part' },
			{ title: 'Head Props', id: 'head-props' },
		]);
	});

	it('numbers repeated headings the way rehype-slug does', () => {
		const markdown = '## Usage\n\n### Usage\n\n## Usage';

		expect(
			sections_of(markdown).map((section) => section.id),
		).toEqual(['usage', 'usage-2']);
	});

	it('ignores headings inside code fences', () => {
		const markdown = '## Real\n\n```md\n## Not a heading\n```';

		expect(sections_of(markdown)).toHaveLength(1);
	});

	it('indexes every docs page for the palette', () => {
		for (const page of pages) {
			expect(sections[page.slug], page.slug).toBeDefined();
		}
		expect(sections['best-practices']).toContainEqual({
			title: 'Twitter Card Types',
			id: 'twitter-card-types',
		});
	});
});
