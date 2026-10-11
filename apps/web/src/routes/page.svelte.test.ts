import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Page from './+page.svelte';

vi.mock('$app/state', () => ({
	page: { url: new URL('https://svead.pages.dev/') },
}));

describe('home page', () => {
	it('says what svead is and how to install it', async () => {
		await render(Page);

		await expect
			.element(page.getByRole('heading', { level: 1 }))
			.toHaveTextContent('Put a proper head on every page.');
		await expect
			.element(
				page.getByRole('button', { name: 'Copy install command' }),
			)
			.toBeInTheDocument();
	});

	it('rewrites the example head as the fields change', async () => {
		await render(Page);

		const head = page.getByLabelText(
			'Tags Head renders for this page',
		);
		const head_text = () => head.element().textContent;
		await expect
			.poll(head_text)
			.toContain('<title>The Mead Hall</title>');

		await page.getByLabelText('Title').fill('Honey & Hops');

		await expect
			.poll(head_text)
			.toContain('<title>Honey & Hops</title>');
		await expect
			.poll(head_text)
			.toContain('<meta property="og:title" content="Honey & Hops">');
	});

	it('links every documentation page', async () => {
		await render(Page);

		await expect
			.element(page.getByRole('link', { name: /^Components/ }))
			.toHaveAttribute('href', '/components');
		await expect
			.element(page.getByRole('link', { name: /^Troubleshooting/ }))
			.toHaveAttribute('href', '/troubleshooting');
	});
});
