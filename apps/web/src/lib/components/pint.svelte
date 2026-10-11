<script lang="ts">
	// The foam on a pint is its head, so this one holds a real one:
	// some of what <Head> renders for the config typed in below
	let title = $state('The Mead Hall');
	let description = $state(
		'Honey, water and yeast. Opening hours, the menu and how to find us.',
	);

	const url = 'https://example.com/';

	type Line = {
		tag: string;
		attributes?: [name: string, value: string][];
		text?: string;
	};

	const lines: Line[] = $derived([
		{ tag: 'title', text: title },
		{
			tag: 'meta',
			attributes: [
				['name', 'description'],
				['content', description],
			],
		},
		{
			tag: 'link',
			attributes: [
				['rel', 'canonical'],
				['href', url],
			],
		},
		{
			tag: 'meta',
			attributes: [
				['property', 'og:title'],
				['content', title],
			],
		},
		{
			tag: 'meta',
			attributes: [
				['property', 'og:description'],
				['content', description],
			],
		},
		{
			tag: 'meta',
			attributes: [
				['name', 'twitter:card'],
				['content', 'summary_large_image'],
			],
		},
	]);
</script>

<div class="pint">
	<div class="glass">
		<div class="foam">
			<p class="part">&lt;head&gt;</p>
			<pre aria-label="Tags Head renders for this page"><code
					>{#each lines as line, index (index)}<span class="line"
							><span class="p">&lt;</span><span class="t"
								>{line.tag}</span
							>{#each line.attributes ?? [] as [name, value] (name)}{' '}<span
									class="a">{name}</span
								><span class="p">="</span><span class="v"
									>{value}</span
								><span class="p">"</span>{/each}<span class="p"
								>&gt;</span
							>{#if line.text !== undefined}<span class="v"
									>{line.text}</span
								><span class="p">&lt;/</span><span class="t"
									>{line.tag}</span
								><span class="p">&gt;</span>{/if}</span
						>{/each}</code
				></pre>
		</div>
		<div class="mead">
			<p class="part">&lt;body&gt;</p>
			<label>
				<span>Title</span>
				<input type="text" bind:value={title} autocomplete="off" />
			</label>
			<label>
				<span>Description</span>
				<textarea rows="2" bind:value={description}></textarea>
			</label>
			<p class="hint">Edit these and watch the head change.</p>
		</div>
	</div>
</div>

<style>
	.pint {
		--ink: var(--color-glass-ink);
		/* Outlines follow the page so the glass has an edge on stout too */
		--edge: var(--color-base-content);
		--line: 2px;
		/* Room for the foam to sit proud of the rim, and for the handle */
		padding: 0.75rem 0.75rem 0;
		color: var(--ink);
	}

	.glass {
		position: relative;
		border: var(--line) solid var(--edge);
		border-top: 0;
		border-radius: 0 0 2.25rem 2.25rem;
		background: linear-gradient(
			var(--color-mead),
			var(--color-mead-deep)
		);
	}

	/* The handle, once there's room beside the glass */
	@media (min-width: 40rem) {
		.pint {
			padding-right: 4rem;
		}

		/* A ring of glass with a line down each edge */
		.glass::after {
			content: '';
			position: absolute;
			bottom: 14%;
			left: 100%;
			width: 3.25rem;
			height: 40%;
			border: 0.7rem solid var(--color-foam);
			border-left: 0;
			border-radius: 0 2rem 2rem 0;
			outline: var(--line) solid var(--edge);
			box-shadow: inset 0 0 0 var(--line) var(--edge);
		}
	}

	.foam {
		position: relative;
		margin: 0 -0.75rem;
		padding: 1rem 1.25rem 1.25rem;
		border: var(--line) solid var(--edge);
		border-radius: 1.75rem 1.75rem 1.25rem 1.25rem;
		background: var(--color-foam);
		translate: 0 -0.75rem;
	}

	/* A drip running down the outside of the glass */
	.foam::after {
		content: '';
		position: absolute;
		top: calc(100% - 0.75rem);
		left: -2px;
		width: 1.4rem;
		height: 3.25rem;
		border: var(--line) solid var(--edge);
		border-top: 0;
		border-radius: 0 0 1rem 1rem;
		background: var(--color-foam);
	}

	.part {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 600;
		opacity: 0.7;
	}

	pre {
		margin-top: 0.5rem;
		font-family: var(--font-mono);
		font-size: clamp(0.75rem, 2.4vw, 0.8125rem);
		font-variant-ligatures: none;
		line-height: 1.65;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	.line {
		display: block;
		padding-left: 1.5ch;
		text-indent: -1.5ch;
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

	.mead {
		display: grid;
		gap: 0.75rem;
		padding: 0.25rem 1.5rem 1.75rem 2rem;
	}

	label {
		display: grid;
		gap: 0.25rem;
		font-size: 0.9375rem;
		font-weight: 600;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.5rem 0.75rem;
		border: var(--line) solid var(--ink);
		border-radius: var(--radius-field);
		background: var(--color-foam);
		color: var(--ink);
		font-weight: 400;
		resize: none;
	}

	input:focus-visible,
	textarea:focus-visible {
		outline: 3px solid var(--ink);
		outline-offset: 2px;
	}

	.hint {
		font-size: 0.875rem;
	}
</style>
