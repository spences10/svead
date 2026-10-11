<script lang="ts" module>
	import type { SearchItem } from '#lib/docs/search.js';
	import type { Component } from 'svelte';

	export interface PaletteItem extends SearchItem {
		group: string;
		icon: Component;
		/** Links navigate, everything else runs */
		href?: string;
		external?: boolean;
		run?: () => void;
		/** Left out of the list until there's a query */
		search_only?: boolean;
	}
</script>

<script lang="ts">
	import { site } from '#lib/config.js';
	import { search } from '#lib/docs/search.js';
	import { palette } from '#lib/state/palette.svelte.js';
	import CornerDownLeftIcon from '@lucide/svelte/icons/corner-down-left';
	import SearchIcon from '@lucide/svelte/icons/search';

	// The inside of the palette. It's only rendered while the palette
	// is open, so every opening starts with an empty query
	let { items }: { items: PaletteItem[] } = $props();

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

	// Only for the keyboard: under the pointer the option is in view
	function move_active(step: number) {
		if (!results.length) return;
		active = (active + step + results.length) % results.length;
		document
			.getElementById(option_id(results[active]))
			?.scrollIntoView({ block: 'nearest' });
	}

	// A new query is a new list, read from the top
	function handle_input() {
		active = 0;
		document.getElementById('palette-results')?.scrollTo({ top: 0 });
	}

	function handle_input_keydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			move_active(1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			move_active(-1);
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

<div class="flex max-h-[min(70vh,34rem)] flex-col">
	<div class="flex items-center gap-3 border-b border-base-300 px-4">
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
			oninput={handle_input}
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

<style>
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
