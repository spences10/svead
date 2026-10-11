import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Page from './+page.svelte';

describe('+page.svelte', () => {
	describe('Initial Rendering', () => {
		it('should say what svead is', async () => {
			await render(Page);

			await expect
				.element(
					page.getByRole('heading', {
						level: 1,
						name: /Put a proper <Head.\/> on every page\./,
					}),
				)
				.toBeInTheDocument();
		});

		it('should offer the install command to copy', async () => {
			await render(Page);

			await expect
				.element(
					page.getByRole('button', { name: 'Copy install command' }),
				)
				.toBeInTheDocument();
		});

		it('should render the pint', async () => {
			await render(Page);

			await expect
				.element(
					page.getByRole('list', {
						name: 'Tags Head renders for this config',
					}),
				)
				.toBeInTheDocument();
		});
	});

	describe('Navigation', () => {
		it('should link every documentation page', async () => {
			await render(Page);

			await expect
				.element(page.getByRole('link', { name: /^Components/ }))
				.toHaveAttribute('href', '/components');
			await expect
				.element(page.getByRole('link', { name: /^Troubleshooting/ }))
				.toHaveAttribute('href', '/troubleshooting');
		});

		it('should point the main action at the quick reference', async () => {
			await render(Page);

			await expect
				.element(
					page.getByRole('link', {
						name: 'Read the quick reference',
					}),
				)
				.toHaveAttribute('href', '/quick-reference');
		});
	});
});
