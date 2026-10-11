import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Pint from './pint.svelte';

const head = () =>
	page.getByRole('list', {
		name: 'Tags Head renders for this config',
	});

describe('pint.svelte', () => {
	describe('Initial Rendering', () => {
		it('should show the head for the starting config', async () => {
			await render(Pint);

			await expect
				.element(
					head().getByText('<title>Mead on tap tonight</title>'),
				)
				.toBeInTheDocument();
			await expect
				.element(
					head().getByText(
						'<link rel="canonical" href="https://example.com/">',
					),
				)
				.toBeInTheDocument();
			await expect
				.element(page.getByText('13 tags'))
				.toBeInTheDocument();
		});

		it('should label the config fields with their option names', async () => {
			await render(Pint);

			await expect
				.element(page.getByRole('textbox', { name: 'title' }))
				.toHaveValue('Mead on tap tonight');
			await expect
				.element(page.getByRole('textbox', { name: 'description' }))
				.toBeInTheDocument();
		});
	});

	describe('User Interactions', () => {
		it('should rewrite the head as the title changes', async () => {
			await render(Pint);

			await page
				.getByRole('textbox', { name: 'title' })
				.fill('Honey & Hops');

			await expect
				.element(head().getByText('<title>Honey & Hops</title>'))
				.toBeInTheDocument();
			await expect
				.element(
					head().getByText(
						'<meta property="og:title" content="Honey & Hops">',
					),
				)
				.toBeInTheDocument();
		});

		it('should rewrite the head as the description changes', async () => {
			await render(Pint);

			await page
				.getByRole('textbox', { name: 'description' })
				.fill('Brewed on site.');

			await expect
				.element(
					head().getByText(
						'<meta name="description" content="Brewed on site.">',
					),
				)
				.toBeInTheDocument();
		});

		it('should add the tags an option brings, and take them away again', async () => {
			await render(Pint);
			const image = page.getByRole('checkbox', {
				name: 'open_graph_image',
			});
			const og_image = head().getByText(
				'<meta property="og:image" content="https://example.com/og.png">',
			);

			await image.click({ force: true });

			await expect.element(og_image).toBeInTheDocument();
			await expect
				.element(page.getByText('17 tags'))
				.toBeInTheDocument();

			await image.click({ force: true });

			await expect.element(og_image).not.toBeInTheDocument();
			await expect
				.element(page.getByText('13 tags'))
				.toBeInTheDocument();
		});

		it('should offer every optional part of the config', async () => {
			await render(Pint);

			for (const name of [
				'author_name',
				'site_name',
				'open_graph_image',
				'twitter_handle',
			]) {
				await expect
					.element(page.getByRole('checkbox', { name }))
					.not.toBeChecked();
			}
		});
	});

	describe('Accessibility', () => {
		it('should group the optional parts under a legend', async () => {
			await render(Pint);

			await expect
				.element(page.getByRole('group', { name: 'Top it up' }))
				.toBeInTheDocument();
		});

		it.skip('should keep the decoration out of the accessibility tree', async () => {
			// TODO: assert the foam, bubbles, handle and mat are aria-hidden
		});
	});
});
