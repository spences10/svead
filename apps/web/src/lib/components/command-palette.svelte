<script lang="ts">
	import { site } from '#lib/config.js';
	import {
		groups,
		href_of,
		pages,
		pages_in,
	} from '#lib/docs/pages.js';
	import { search, type SearchItem } from '#lib/docs/search.js';
	import { sections as page_sections } from '#lib/docs/sections.js';
	import { palette } from '#lib/state/palette.svelte.js';
	import { set_mode } from '#lib/state/theme.svelte.js';
	import { afterNavigate } from '$app/navigation';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import BracesIcon from '@lucide/svelte/icons/braces';
	import CornerDownLeftIcon from '@lucide/svelte/icons/corner-down-left';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import HashIcon from '@lucide/svelte/icons/hash';
	import LifeBuoyIcon from '@lucide/svelte/icons/life-buoy';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import RocketIcon from '@lucide/svelte/icons/rocket';
	import SearchIcon from '@lucide/svelte/icons/search';
	import SunIcon from '@lucide/svelte/icons/sun';
	import WrenchIcon from '@lucide/svelte/icons/wrench';
	import * as Fathom from 'fathom-client';
	import type { Component } from 'svelte';

	interface PaletteItem extends SearchItem {
		group: string;
		icon: Component;
		/** Links navigate, everything else runs */
		href?: string;
		external?: boolean;
		run?: () => void;
		/** Left out of the list until there's a query */
		search_only?: boolean;
	}

	const group_icons = {
		start: RocketIcon,
		schema: BracesIcon,
		advanced: WrenchIcon,
		help: LifeBuoyIcon,
	};

	const items: PaletteItem[] = [
		{
			id: 'home',
			title: 'Home',
			detail: 'Install Svead and render your first head',
			keywords: ['install', 'getting started', 'setup', 'start'],
			group: 'Getting started',
			icon: BookOpenIcon,
			href: '/',
		},
		...groups.flatMap((group) =>
			pages_in(group.id).map((page) => ({
				id: page.slug,
				title: page.title,
				detail: page.description,
				keywords: [...page.keywords, group.label],
				group: group.label,
				icon: group_icons[group.id],
				href: href_of(page),
			})),
		),
		// Headings inside each page, so "twitter card" lands on the
		// section and not just the page
		...pages.flatMap((page) =>
			(page_sections[page.slug] ?? []).map((section) => ({
				id: `${page.slug}-${section.id}`,
				title: section.title,
				group: page.title,
				icon: HashIcon,
				href: `${href_of(page)}#${section.id}`,
				search_only: true,
			})),
		),
		{
			id: 'theme-light',
			title: 'Light theme',
			keywords: ['mode', 'appearance', 'colour', 'color'],
			group: 'Theme',
			icon: SunIcon,
			run: () => set_mode('light'),
		},
		{
			id: 'theme-dark',
			title: 'Dark theme',
			keywords: ['mode', 'appearance', 'colour', 'color', 'stout'],
			group: 'Theme',
			icon: MoonIcon,
			run: () => set_mode('dark'),
		},
		{
			id: 'theme-system',
			title: 'Match system theme',
			keywords: ['mode', 'appearance', 'auto', 'colour', 'color'],
			group: 'Theme',
			icon: MonitorIcon,
			run: () => set_mode('system'),
		},
		{
			id: 'github',
			title: 'GitHub repository',
			keywords: ['source', 'code', 'issues', 'star'],
			group: 'Links',
			icon: ExternalLinkIcon,
			href: site.repo,
			external: true,
		},
		{
			id: 'npm',
			title: 'npm package',
			keywords: ['install', 'versions', 'registry'],
			group: 'Links',
			icon: ExternalLinkIcon,
			href: site.npm,
			external: true,
		},
	];

	let dialog: HTMLDialogElement | undefined;
	let query = $state('');
	let active = $state(0);

	const results = $derived(
		query.trim()
			? search(query, items)
			: items.filter((item) => !item.search_only),
	);

	// Browsing shows everything under its group. Once there's a query
	// the ranking matters more than the grouping, so it's one list
	const sections = $derived.by(() => {
		if (query.trim()) return [{ heading: '', items: results }];
		const by_group: Record<string, PaletteItem[]> = {};
		for (const item of results)
			(by_group[item.group] ??= []).push(item);
		return Object.entries(by_group).map(([heading, items]) => ({
			heading,
			items,
		}));
	});

	const option_id = (item: PaletteItem) =>
		`palette-option-${item.id}`;
	const active_item = $derived(results[active]);

	$effect(() => {
		if (!dialog) return;
		if (palette.open && !dialog.open) {
			query = '';
			active = 0;
			dialog.showModal();
			Fathom.trackEvent('palette open');
		} else if (!palette.open && dialog.open) {
			dialog.close();
		}
	});

	$effect(() => {
		if (!active_item) return;
		document
			.getElementById(option_id(active_item))
			?.scrollIntoView({ block: 'nearest' });
	});

	afterNavigate(() => {
		palette.open = false;
	});

	function is_typing(target: EventTarget | null) {
		return (
			target instanceof HTMLElement &&
			(target.isContentEditable ||
				['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
		);
	}

	function handle_window_keydown(event: KeyboardEvent) {
		if (
			(event.metaKey || event.ctrlKey) &&
			event.key.toLowerCase() === 'k'
		) {
			event.preventDefault();
			palette.open = !palette.open;
		} else if (
			event.key === '/' &&
			!palette.open &&
			!is_typing(event.target)
		) {
			event.preventDefault();
			palette.open = true;
		}
	}

	function handle_input_keydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			active = (active + 1) % Math.max(results.length, 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			active =
				(active - 1 + results.length) % Math.max(results.length, 1);
		} else if (event.key === 'Enter' && active_item) {
			event.preventDefault();
			// Click the option itself so links stay real navigations
			document.getElementById(option_id(active_item))?.click();
		}
	}

	function select(item: PaletteItem) {
		item.run?.();
		palette.open = false;
	}
</script>

<svelte:window onkeydown={handle_window_keydown} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	class="palette"
	aria-label="Search the docs"
	onclose={() => (palette.open = false)}
	onclick={(event) => {
		// The dialog element itself is only hit on the backdrop
		if (event.target === dialog) palette.open = false;
	}}
>
	<div class="flex max-h-[min(70vh,34rem)] flex-col">
		<div
			class="flex items-center gap-3 border-b border-base-300 px-4"
		>
			<SearchIcon
				class="size-5 shrink-0 text-muted"
				aria-hidden="true"
			/>
			<!-- svelte-ignore a11y_autofocus -->
			<input
				bind:value={query}
				type="text"
				role="combobox"
				class="h-14 w-full bg-transparent text-lg outline-none placeholder:text-muted"
				placeholder="Search the docs"
				aria-label="Search the docs"
				aria-expanded="true"
				aria-controls="palette-results"
				aria-autocomplete="list"
				aria-activedescendant={active_item
					? option_id(active_item)
					: undefined}
				autocomplete="off"
				autocapitalize="off"
				spellcheck="false"
				autofocus
				oninput={() => (active = 0)}
				onkeydown={handle_input_keydown}
			/>
			<kbd
				class="hidden rounded border border-base-300 px-1.5 py-0.5 font-mono text-xs text-muted sm:block"
				>esc</kbd
			>
		</div>

		<div
			id="palette-results"
			role="listbox"
			aria-label="Results"
			class="overflow-y-auto overscroll-contain p-2"
		>
			{#each sections as section (section.heading)}
				<div
					role="group"
					aria-label={section.heading || 'Results'}
					class="mb-1 last:mb-0"
				>
					{#if section.heading}
						<div
							class="px-3 pt-2 pb-1 text-sm font-semibold text-muted"
							aria-hidden="true"
						>
							{section.heading}
						</div>
					{/if}
					{#each section.items as item (item.id)}
						{@const selected = item === active_item}
						<svelte:element
							this={item.href ? 'a' : 'button'}
							id={option_id(item)}
							role="option"
							tabindex="-1"
							aria-selected={selected}
							href={item.href}
							type={item.href ? undefined : 'button'}
							target={item.external ? '_blank' : undefined}
							rel={item.external ? 'noopener noreferrer' : undefined}
							class="option"
							onclick={() => select(item)}
							onpointermove={() => (active = results.indexOf(item))}
						>
							<item.icon
								class="size-4 shrink-0 text-muted"
								aria-hidden="true"
							/>
							<span class="flex min-w-0 flex-1 flex-col">
								<span class="truncate font-medium">{item.title}</span>
								{#if item.detail}
									<span class="truncate text-sm text-muted"
										>{item.detail}</span
									>
								{/if}
							</span>
							{#if !section.heading}
								<span
									class="hidden shrink-0 text-sm text-muted sm:block"
									>{item.group}</span
								>
							{/if}
							<CornerDownLeftIcon
								class="enter size-4 shrink-0 text-muted"
								aria-hidden="true"
							/>
						</svelte:element>
					{/each}
				</div>
			{:else}
				<p class="px-3 py-8 text-center text-muted">
					Nothing matches “{query}”. Try a tag or schema name, or
					<a
						class="link text-primary"
						href="{site.repo}/issues"
						target="_blank"
						rel="noopener noreferrer">ask on GitHub</a
					>.
				</p>
			{/each}
		</div>

		<div
			class="hidden items-center gap-4 border-t border-base-300 px-4 py-2 text-sm text-muted sm:flex"
			aria-hidden="true"
		>
			<span
				><kbd class="key">↑</kbd> <kbd class="key">↓</kbd> to move</span
			>
			<span><kbd class="key">↵</kbd> to open</span>
			<span class="ml-auto"
				>{results.length}
				{results.length === 1 ? 'result' : 'results'}</span
			>
		</div>
	</div>
</dialog>

<style>
	.palette {
		width: min(40rem, calc(100vw - 2rem));
		max-width: none;
		margin: 12vh auto auto;
		padding: 0;
		overflow: hidden;
		border: 1.5px solid var(--color-base-content);
		border-radius: var(--radius-box);
		background: var(--color-base-100);
		color: var(--color-base-content);
		box-shadow: 6px 6px 0 var(--color-secondary);
	}

	.palette::backdrop {
		background: rgb(20 14 9 / 0.6);
		backdrop-filter: blur(2px);
	}

	@media (prefers-reduced-motion: no-preference) {
		.palette[open] {
			animation: palette-in 140ms ease-out;
		}
	}

	@keyframes palette-in {
		from {
			opacity: 0;
			transform: translateY(-6px) scale(0.99);
		}
	}

	.option {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-field);
		text-align: left;
		cursor: pointer;
	}

	.option :global(.enter) {
		visibility: hidden;
	}

	.option[aria-selected='true'] {
		background: var(--color-base-200);
		box-shadow: inset 3px 0 0 var(--color-primary);
	}

	.option[aria-selected='true'] :global(.enter) {
		visibility: visible;
	}

	.key {
		padding: 0.05rem 0.35rem;
		border: 1px solid var(--color-base-300);
		border-radius: 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
	}
</style>
