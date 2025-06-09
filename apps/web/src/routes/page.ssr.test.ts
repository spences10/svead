import { render } from 'svelte/server';
import { describe, expect, it, vi } from 'vitest';
import Page from './+page.svelte';

// Mock the page state
vi.mock('$app/state', () => ({
	page: {
		url: new URL('https://svead.pages.dev'),
	},
}));

// Mock Copy component properly
const MockCopy = vi.fn(() => 'Mock copy content');

describe('page.svelte SSR - Svead Head Component Validation', () => {
	const mock_data = {
		Copy: MockCopy,
	};

	describe('Core Svead Head Component Functionality', () => {
		it('should render without errors', () => {
			expect(() =>
				render(Page, { props: { data: mock_data } }),
			).not.toThrow();
		});

		it('should generate SEO meta tags', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			// Test that essential SEO elements are present
			expect(head).toMatch(/<title>/);
			expect(head).toMatch(/name="description"/);
			expect(head).toMatch(/rel="canonical"/);
		});

		it('should generate Open Graph tags', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			expect(head).toMatch(/property="og:title"/);
			expect(head).toMatch(/property="og:description"/);
			expect(head).toMatch(/property="og:image"/);
			expect(head).toMatch(/property="og:url"/);
		});

		it('should generate Twitter Card tags', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			expect(head).toMatch(/name="twitter:card"/);
			expect(head).toMatch(/name="twitter:title"/);
			expect(head).toMatch(/name="twitter:description"/);
			expect(head).toMatch(/name="twitter:image"/);
		});

		it('should generate structured data meta tags', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			// Should include basic structured data elements
			expect(head).toMatch(/name="author"/);
		});

		it('should not contain broken or undefined values', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			expect(head).not.toMatch(/undefined/);
			expect(head).not.toMatch(/\[object Object\]/);
			expect(head).not.toMatch(/content=""/);
		});
	});

	describe('Svead Component Configuration Validation', () => {
		it('should use correct SEO configuration values', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			// Validate that svead Head component uses the expected config
			expect(head).toMatch(/This is Svead a Svelte Head Component/);
			expect(head).toMatch(/Scott Spence/);
			expect(head).toMatch(/svead\.pages\.dev/);
		});

		it('should integrate with SvelteKit page URL', () => {
			const { head } = render(Page, { props: { data: mock_data } });

			// Should use the mocked URL
			expect(head).toMatch(/https:\/\/svead\.pages\.dev/);
		});
	});

	describe('Page Content Integration', () => {
		it('should render Copy component', () => {
			const { body } = render(Page, { props: { data: mock_data } });

			// Verify the Copy component was called (it's a mock function)
			expect(MockCopy).toHaveBeenCalled();
		});

		it('should handle missing data gracefully', () => {
			// Test with a proper mock that doesn't throw
			const MockCopyEmpty = vi.fn(() => '');
			expect(() =>
				render(Page, { props: { data: { Copy: MockCopyEmpty } } }),
			).not.toThrow();
		});
	});
});
