import { render } from 'svelte/server';
import { describe, expect, it, vi } from 'vitest';
import Page from './+page.svelte';

// Mock the page store properly for breadcrumbs page
vi.mock('$app/stores', () => {
	// Create a proper store mock that implements Svelte's store interface
	const createMockStore = (value: any) => ({
		subscribe: vi.fn((callback) => {
			callback(value);
			return vi.fn(); // Return unsubscribe function
		}),
		...value, // Spread the actual value properties
	});

	return {
		page: createMockStore({
			url: {
				href: 'https://svead.pages.dev/breadcrumbs',
				toString: () => 'https://svead.pages.dev/breadcrumbs',
			},
			params: {},
			route: { id: '/breadcrumbs' },
		}),
	};
});

// Mock Copy component properly
const MockCopy = vi.fn(() => 'Mock breadcrumbs copy content');

describe('breadcrumbs page.svelte SSR - Svead Components Validation', () => {
	const mock_data = {
		Copy: MockCopy,
	};

	describe('Svead Head Component Functionality', () => {
		it('should generate essential SEO meta tags', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			// Test that svead Head component generates essential SEO elements
			expect(head).toMatch(/<title>/);
			expect(head).toMatch(/name="description"/);
			expect(head).toMatch(/rel="canonical"/);
			expect(head).toMatch(/property="og:title"/);
			expect(head).toMatch(/name="author"/);
		});
	});

	describe('Svead SchemaOrg Component Functionality', () => {
		it('should generate JSON-LD structured data', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			// Test that SchemaOrg component generates JSON-LD
			expect(head).toMatch(/<script type="application\/ld\+json">/);
			expect(head).toMatch(/"@type":\s*"WebPage"/);
		});

		it('should generate valid JSON structure', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			// Extract JSON-LD and validate it's parseable
			const jsonLdMatch = head.match(
				/<script type="application\/ld\+json">(.*?)<\/script>/s,
			);
			if (jsonLdMatch) {
				expect(() => JSON.parse(jsonLdMatch[1])).not.toThrow();
			}
		});
	});

	describe('Svead Integration Validation', () => {
		it('should demonstrate Head and SchemaOrg working together', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			// Both Head and SchemaOrg should contribute to head content
			expect(head).toMatch(/name="description"/); // Head component
			expect(head).toMatch(/application\/ld\+json/); // SchemaOrg component
		});

		it('should handle various SEO configuration options', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			// Test that the breadcrumbs demo uses multiple SEO features
			expect(head).toMatch(/property="og:/); // Open Graph
			expect(head).toMatch(/name="twitter:/); // Twitter Card
			expect(head).toMatch(/"BreadcrumbList"/); // Breadcrumb schema
		});
	});

	describe('Real svead Package Functionality', () => {
		it('should validate svead components render without errors', () => {
			// Test that the actual svead components work in SSR
			expect(() =>
				render(Page, { props: { data: mock_data } }),
			).not.toThrow();
		});

		it('should demonstrate structured data capabilities', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			// Validate that complex schema features work
			expect(head).toMatch(/"@type":\s*"WebPage"/);
			expect(head).toMatch(/"breadcrumb"/);
			expect(head).toMatch(/"mainEntity"/);
		});
	});
});
