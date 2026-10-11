<script lang="ts">
	import { head_tags, type HeadTag } from '#lib/docs/head-tags.js';
	import type { SeoConfig } from 'svead';
	import { slide } from 'svelte/transition';

	// The foam on a pint is its head, so this one holds a real one:
	// what <Head> renders for the config in the glass below it
	let title = $state('Mead on tap tonight');
	let description = $state(
		'Six meads, two ciders and a guest ale. See what’s pouring.',
	);

	// Optional parts of the config, each with a value to pour in
	const extras = [
		{ key: 'author_name', value: 'Ada Brewer' },
		{ key: 'site_name', value: 'The Mead Hall' },
		{ key: 'open_graph_image', value: 'https://example.com/og.png' },
		{ key: 'twitter_handle', value: '@meadhall' },
	] as const;

	let enabled = $state<Record<string, boolean>>({});

	const config: SeoConfig = $derived({
		title,
		description,
		url: 'https://example.com/',
		...Object.fromEntries(
			extras
				.filter((extra) => enabled[extra.key])
				.map((extra) => [extra.key, extra.value]),
		),
	});

	const tags = $derived(head_tags(config));

	// Stable across edits, so only tags that come and go animate
	const key_of = (tag: HeadTag) =>
		`${tag.tag}:${tag.attributes[0]?.join('=') ?? ''}`;

	// The lumps along the top of the head: centre (% across), diameter
	// and drop from the top (px)
	const puffs = [
		{ x: 5, d: 56, y: 16 },
		{ x: 17, d: 74, y: 4 },
		{ x: 31, d: 62, y: 12 },
		{ x: 45, d: 88, y: 0 },
		{ x: 60, d: 66, y: 10 },
		{ x: 73, d: 78, y: 3 },
		{ x: 87, d: 60, y: 13 },
		{ x: 96, d: 52, y: 20 },
	];

	// Runs of foam down the outside of the glass: left edge (% across),
	// width and length (px)
	const drips = [
		{ x: 0, w: 24, h: 62 },
		{ x: 13, w: 18, h: 14 },
		{ x: 78, w: 20, h: 24 },
	];

	// Bubbles rising through the mead: left (%), size (px), seconds to
	// reach the head, delay, and where each sits when motion is off (%)
	const bubbles = [
		{ x: 6, s: 7, t: 7, delay: 0, rest: 22 },
		{ x: 14, s: 4, t: 5.5, delay: 2.2, rest: 61 },
		{ x: 24, s: 9, t: 8.5, delay: 4.1, rest: 38 },
		{ x: 39, s: 5, t: 6.2, delay: 1.3, rest: 78 },
		{ x: 52, s: 6, t: 7.4, delay: 3.4, rest: 12 },
		{ x: 66, s: 4, t: 5.8, delay: 0.7, rest: 48 },
		{ x: 77, s: 8, t: 9, delay: 5.2, rest: 30 },
		{ x: 88, s: 5, t: 6.6, delay: 2.9, rest: 70 },
		{ x: 95, s: 7, t: 7.8, delay: 4.6, rest: 16 },
	];

	let foam: HTMLDivElement | undefined;

	// The head wobbles as an option pours in or out. Typing changes
	// what the tags say, not how many there are, so it stays still
	function wobble() {
		const reduced = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		if (reduced) return;

		foam?.animate(
			[
				{ scale: '1 1' },
				{ scale: '1.015 0.97' },
				{ scale: '0.99 1.02' },
				{ scale: '1 1' },
			],
			{ duration: 420, easing: 'ease-out' },
		);
	}
</script>

{#snippet cloud(fill: boolean)}
	<!-- Drips first, so they hang from under the head's bottom edge -->
	{#each drips as drip (drip.x)}
		<span
			class="drip"
			style="--x: {drip.x}%; --w: {drip.w}px; --h: {drip.h}px"
		></span>
	{/each}
	<span class="slab"></span>
	{#each puffs as puff (puff.x)}
		<span
			class="puff"
			style="--x: {puff.x}%; --d: {puff.d}px; --y: {puff.y}px"
		></span>
	{/each}
	{#if fill}
		<!-- A few bubbles in the foam itself -->
		<span class="fleck" style="--x: 12%; --y: 34px; --d: 12px"></span>
		<span class="fleck" style="--x: 41%; --y: 16px; --d: 18px"></span>
		<span class="fleck" style="--x: 47%; --y: 40px; --d: 8px"></span>
		<span class="fleck" style="--x: 70%; --y: 24px; --d: 14px"></span>
		<span class="fleck" style="--x: 90%; --y: 42px; --d: 9px"></span>
	{/if}
{/snippet}

<div class="pint">
	<div class="mug">
		<div class="foam" bind:this={foam}>
			<!-- Every shape twice: outlines underneath, fills on top, so
			     the lumps merge into one outlined cloud -->
			<div class="cloud ink" aria-hidden="true">
				{@render cloud(false)}
			</div>
			<div class="cloud fill" aria-hidden="true">
				{@render cloud(true)}
			</div>

			<div class="head">
				<p class="bar">
					<span>&lt;head&gt;</span>
					<span>
						{tags.length} tags
					</span>
				</p>
				<ul aria-label="Tags Head renders for this config">
					{#each tags as tag (key_of(tag))}
						<li transition:slide={{ duration: 220 }}>
							<span class="p">&lt;</span><span class="t"
								>{tag.tag}</span
							>{#each tag.attributes as [name, value] (name)}{' '}<span
									class="a">{name}</span
								><span class="p">="</span><span class="v"
									>{value}</span
								><span class="p">"</span>{/each}<span class="p"
								>&gt;</span
							>{#if tag.text !== undefined}<span class="v"
									>{tag.text}</span
								><span class="p">&lt;/</span><span class="t"
									>{tag.tag}</span
								><span class="p">&gt;</span>{/if}
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="glass">
			<div class="mead" aria-hidden="true">
				{#each bubbles as bubble (bubble.x)}
					<span
						class="bubble"
						style="--x: {bubble.x}%; --s: {bubble.s}px; --t: {bubble.t}s; --delay: {bubble.delay}s; --rest: {bubble.rest}%"
					></span>
				{/each}
			</div>

			<form
				class="config"
				onsubmit={(event) => event.preventDefault()}
			>
				<p class="bar">seo_config</p>
				<label>
					<span>title</span>
					<input type="text" bind:value={title} autocomplete="off" />
				</label>
				<label>
					<span>description</span>
					<textarea rows="2" bind:value={description}></textarea>
				</label>
				<fieldset>
					<legend>Top it up</legend>
					<div class="extras">
						{#each extras as extra (extra.key)}
							<label
								class="extra"
								title="{extra.key}: '{extra.value}'"
							>
								<input
									type="checkbox"
									bind:checked={enabled[extra.key]}
									onchange={wobble}
								/>
								<span>{extra.key}</span>
							</label>
						{/each}
					</div>
				</fieldset>
			</form>

			<span class="handle" aria-hidden="true"></span>
		</div>

		<span class="mat" aria-hidden="true"></span>
	</div>
</div>

<style>
	.pint {
		--ink: var(--color-glass-ink);
		/* Outlines follow the page, so the glass has an edge on stout */
		--edge: var(--color-base-content);
		--line: 2px;
		--foam: var(--color-foam);
		--foam-shade: #f1e4c2;
		--glass: color-mix(
			in oklch,
			var(--color-base-300) 70%,
			var(--color-base-100)
		);
		/* Room for the head to overhang the rim, and for the mat */
		/* A grid item: without this the unwrapped tags set its width */
		min-width: 0;
		padding-inline: 1.25rem;
		color: var(--ink);
	}

	.mug {
		position: relative;
	}

	/* ---------- The head ---------- */

	.foam {
		position: relative;
		z-index: 2;
		margin-inline: -0.875rem;
		padding: 3.75rem 1.5rem 1.625rem;
		transform-origin: bottom;
	}

	.cloud {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.cloud > * {
		position: absolute;
	}

	.ink > * {
		background: var(--edge);
		box-shadow: 0 0 0 var(--line) var(--edge);
	}

	.fill > * {
		background: var(--foam);
	}

	.slab {
		inset: 2.5rem 0 0;
		/* Tighter where the long drip runs off the corner */
		border-radius: 1.5rem 1.5rem 1.75rem 0.875rem;
	}

	/* A band of shade where the head sits on the rim */
	.fill .slab {
		box-shadow: inset 0 -0.75rem 0 var(--foam-shade);
	}

	.puff {
		top: var(--y);
		left: calc(var(--x) - var(--d) / 2);
		width: var(--d);
		height: var(--d);
		border-radius: 50%;
	}

	.drip {
		top: calc(100% - 1.25rem);
		left: var(--x);
		width: var(--w);
		height: calc(var(--h) + 1.25rem);
		border-radius: 0 0 99px 99px;
	}

	.fill .drip {
		box-shadow: inset -0.3rem 0 0 var(--foam-shade);
	}

	.fill .fleck {
		top: var(--y);
		left: var(--x);
		width: var(--d);
		height: var(--d);
		border: var(--line) solid var(--foam-shade);
		border-radius: 50%;
		background: none;
	}

	.head {
		position: relative;
	}

	.bar {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 600;
		color: color-mix(in oklch, var(--ink) 72%, transparent);
	}

	ul {
		margin-top: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-variant-ligatures: none;
		line-height: 1.6;
	}

	li {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.p {
		color: #6b6252;
	}

	.t {
		color: #12643f;
		font-weight: 600;
	}

	.a {
		color: #6a5600;
	}

	.v {
		color: #9a3b12;
		font-weight: 600;
	}

	/* ---------- The glass ---------- */

	.glass {
		position: relative;
		z-index: 1;
		margin-top: -1.5rem;
		padding: 3.125rem 1.625rem 2.125rem 1.875rem;
		border: var(--line) solid var(--edge);
		border-top: 0;
		border-radius: 0 0 2rem 2rem;
		background: var(--glass);
	}

	/* The mead sits inside the glass: thin walls, a thick base */
	.mead {
		position: absolute;
		inset: 0 0.5rem 1.125rem;
		overflow: hidden;
		border-radius: 0 0 1.375rem 1.375rem;
		box-shadow: 0 0 0 var(--line) var(--edge);
		background:
			linear-gradient(
				90deg,
				rgb(255 255 255 / 0.16),
				transparent 22%,
				transparent 72%,
				rgb(110 52 0 / 0.2)
			),
			linear-gradient(var(--color-mead) 30%, var(--color-mead-deep));
		transform-origin: bottom;
	}

	/* Light catching the glass */
	.mead::before,
	.mead::after {
		content: '';
		position: absolute;
		border-radius: 99px;
		background: rgb(255 255 255 / 0.42);
	}

	.mead::before {
		top: 3.25rem;
		bottom: 2.25rem;
		left: 0.5rem;
		width: 0.5rem;
	}

	.mead::after {
		top: 5.5rem;
		bottom: 38%;
		left: 1.375rem;
		width: 0.1875rem;
		background: rgb(255 255 255 / 0.3);
	}

	.bubble {
		position: absolute;
		bottom: var(--rest);
		left: var(--x);
		width: var(--s);
		height: var(--s);
		border: 1.5px solid rgb(255 250 234 / 0.8);
		border-radius: 50%;
	}

	.config {
		position: relative;
		display: grid;
		gap: 0.625rem;
	}

	.config .bar {
		color: color-mix(in oklch, var(--ink) 80%, transparent);
	}

	label {
		display: grid;
		gap: 0.25rem;
	}

	label > span,
	legend {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 600;
	}

	input[type='text'],
	textarea {
		width: 100%;
		padding: 0.375rem 0.75rem;
		border: var(--line) solid var(--ink);
		border-radius: var(--radius-field);
		background: var(--foam);
		color: var(--ink);
		font-size: 0.9375rem;
		line-height: 1.45;
		resize: none;
	}

	input[type='text']:focus-visible,
	textarea:focus-visible {
		outline: 3px solid var(--ink);
		outline-offset: 2px;
	}

	legend {
		margin-bottom: 0.375rem;
		font-family: var(--font-sans);
		font-size: 0.875rem;
	}

	.extras {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.extra {
		position: relative;
		display: block;
		cursor: pointer;
	}

	.extra input {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: pointer;
	}

	.extra span {
		display: block;
		padding: 0.25rem 0.625rem;
		border: var(--line) solid var(--ink);
		border-radius: 99px;
		font-size: 0.75rem;
		transition:
			background-color 120ms,
			color 120ms;
	}

	.extra:hover span {
		background: rgb(255 250 234 / 0.45);
	}

	.extra input:checked + span {
		background: var(--ink);
		color: var(--foam);
	}

	.extra input:focus-visible + span {
		outline: 3px solid var(--ink);
		outline-offset: 2px;
	}

	.handle {
		display: none;
	}

	.mat {
		position: relative;
		display: block;
		height: 0.875rem;
		margin: calc(var(--line) * -1) -4% 0;
		border: var(--line) solid var(--edge);
		border-radius: 0.375rem;
		background: var(--color-primary);
	}

	/* The shadow the mat throws */
	.mat::after {
		content: '';
		position: absolute;
		inset: 100% 4% auto;
		height: 0.875rem;
		background: radial-gradient(
			ellipse at top,
			rgb(0 0 0 / 0.22),
			transparent 70%
		);
	}

	/* The handle, once there's room beside the glass */
	@media (min-width: 40rem) {
		.pint {
			padding-inline: 2.25rem 5rem;
		}

		.mat {
			margin-inline: -7%;
		}

		/* A ring of glass with a line down each edge */
		.handle {
			position: absolute;
			top: 20%;
			left: calc(100% - var(--line));
			display: block;
			width: 3.75rem;
			height: 46%;
			border: 0.9375rem solid var(--glass);
			border-left: 0;
			border-radius: 0 2.75rem 2.75rem 0;
			outline: var(--line) solid var(--edge);
			box-shadow: inset 0 0 0 var(--line) var(--edge);
		}
	}

	/* ---------- Motion ---------- */

	@media (prefers-reduced-motion: no-preference) {
		/* One pour on arrival: the mead fills, then the head rises */
		.mead {
			animation: pour 800ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
		}

		.config {
			animation: settle 400ms 450ms both;
		}

		.foam {
			animation: rise 600ms 550ms cubic-bezier(0.34, 1.56, 0.64, 1)
				both;
		}

		.bubble {
			bottom: -0.75rem;
			animation: bubble var(--t) var(--delay) linear infinite;
		}
	}

	@keyframes pour {
		from {
			scale: 1 0;
		}
	}

	@keyframes settle {
		from {
			opacity: 0;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			scale: 0.94 0.5;
		}
	}

	@keyframes bubble {
		from {
			bottom: -0.75rem;
			opacity: 0;
		}

		12% {
			opacity: 1;
		}

		80% {
			opacity: 1;
		}

		to {
			bottom: 100%;
			opacity: 0;
			translate: 0.5rem 0;
		}
	}
</style>
