import { describe, expect, it } from 'vitest';

// Utility functions that mirror what's used in the components
describe('Utility Functions', () => {
	describe('Date Utilities', () => {
		it('should generate current ISO date string', () => {
			const get_current_iso_date = () => new Date().toISOString();
			const isoDate = get_current_iso_date();

			expect(isoDate).toMatch(
				/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
			);
			expect(() => new Date(isoDate)).not.toThrow();
		});

		it('should get current year', () => {
			const get_current_year = () => new Date().getFullYear();
			const year = get_current_year();

			expect(typeof year).toBe('number');
			expect(year).toBeGreaterThan(2020);
		});
	});

	describe('String Utilities', () => {
		it('should create author URL from name', () => {
			const create_author_url = (
				website: string,
				author_name: string,
			) =>
				`${website}/author/${author_name.toLowerCase().replace(' ', '-')}`;

			const result = create_author_url(
				'https://example.com',
				'John Doe',
			);
			expect(result).toBe('https://example.com/author/john-doe');
		});

		it('should create breadcrumb URL', () => {
			const create_breadcrumb_item = (
				name: string,
				url: string,
				position: number,
			) => ({
				'@type': 'ListItem',
				position,
				name,
				item: url,
			});

			const item = create_breadcrumb_item(
				'Home',
				'https://example.com',
				1,
			);
			expect(item.position).toBe(1);
			expect(item.name).toBe('Home');
			expect(item.item).toBe('https://example.com');
		});

		it('should create schema ID', () => {
			const create_schema_id = (base_url: string, fragment: string) =>
				`${base_url}#${fragment}`;

			const schema_id = create_schema_id(
				'https://example.com/page',
				'article',
			);
			expect(schema_id).toBe('https://example.com/page#article');
		});
	});

	describe('CSS Utilities', () => {
		it('should combine CSS classes', () => {
			const combine_classes = (...classes: string[]) =>
				classes.join(' ');

			const result = combine_classes('btn', 'btn-primary', 'btn-sm');
			expect(result).toBe('btn btn-primary btn-sm');
		});

		it('should create dynamic CSS class string', () => {
			const create_svg_class = (fill: string) =>
				`${fill} text-primary-content transition hover:text-secondary-focus`;

			const class_string = create_svg_class('fill-current');
			expect(class_string).toBe(
				'fill-current text-primary-content transition hover:text-secondary-focus',
			);
		});
	});

	describe('Object Utilities', () => {
		it('should create conditional object properties', () => {
			const create_conditional_schema = (website?: string) => ({
				'@type': 'WebPage',
				...(website && {
					isPartOf: {
						'@type': 'WebSite',
						'@id': website,
					},
				}),
			});

			const with_website = create_conditional_schema(
				'https://example.com',
			);
			expect(with_website.isPartOf).toBeDefined();

			const without_website = create_conditional_schema();
			expect(without_website.isPartOf).toBeUndefined();
		});

		it('should merge schema objects', () => {
			const merge_schema = (base: object, extension: object) => ({
				...base,
				...extension,
			});

			const base = { '@type': 'Thing', name: 'Test' };
			const extension = { description: 'Test description' };
			const merged = merge_schema(base, extension);

			expect(merged).toEqual({
				'@type': 'Thing',
				name: 'Test',
				description: 'Test description',
			});
		});
	});

	describe('Validation Utilities', () => {
		it('should validate ISO date format', () => {
			const is_valid_iso_date = (date_string: string) => {
				const iso_regex =
					/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
				return iso_regex.test(date_string);
			};

			expect(is_valid_iso_date('2023-06-15T10:30:00.000Z')).toBe(
				true,
			);
			expect(is_valid_iso_date('invalid-date')).toBe(false);
		});

		it('should validate URL format', () => {
			const is_valid_url = (url_string: string) => {
				try {
					new URL(url_string);
					return true;
				} catch {
					return false;
				}
			};

			expect(is_valid_url('https://example.com')).toBe(true);
			expect(is_valid_url('invalid-url')).toBe(false);
		});
	});

	describe('Array Utilities', () => {
		it('should create breadcrumb list', () => {
			const create_breadcrumb_list = (
				items: Array<{ name: string; url: string }>,
			) =>
				items.map((item, index) => ({
					'@type': 'ListItem',
					position: index + 1,
					name: item.name,
					item: item.url,
				}));

			const items = [
				{ name: 'Home', url: 'https://example.com' },
				{ name: 'Blog', url: 'https://example.com/blog' },
			];

			const breadcrumbs = create_breadcrumb_list(items);
			expect(breadcrumbs).toHaveLength(2);
			expect(breadcrumbs[0].position).toBe(1);
			expect(breadcrumbs[1].position).toBe(2);
		});
	});
});
