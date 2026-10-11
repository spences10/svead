<script lang="ts">
	import { groups, href_of, pages_in } from '#lib/docs/pages.js';
</script>

<!-- The docs, written up like the board behind a bar: a name, a
     leader of dots, and what you get -->
<div class="grid gap-x-14 gap-y-10 md:grid-cols-2">
	{#each groups as group (group.id)}
		<section aria-labelledby="tap-{group.id}">
			<h3
				id="tap-{group.id}"
				class="mb-3 border-b-2 border-base-content pb-2 text-xl font-bold"
			>
				{group.label}
			</h3>
			<ul>
				{#each pages_in(group.id) as page (page.slug)}
					<li>
						<a href={href_of(page)} class="tap group">
							<span class="flex items-baseline gap-2">
								<span
									class="font-display text-lg font-bold group-hover:underline group-hover:decoration-secondary group-hover:decoration-[3px] group-hover:underline-offset-4"
								>
									{page.title}
								</span>
								<span class="leader" aria-hidden="true"></span>
							</span>
							<span class="block text-[0.9375rem] text-muted">
								{page.description}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<style>
	.tap {
		display: block;
		padding-block: 0.6rem;
	}

	.leader {
		flex: 1;
		min-width: 1.5rem;
		height: 0.3em;
		background-image: radial-gradient(
			circle,
			var(--color-base-300) 1.5px,
			transparent 1.6px
		);
		background-size: 8px 100%;
		background-position: left center;
	}

	.tap:hover .leader {
		background-image: radial-gradient(
			circle,
			var(--color-secondary) 1.5px,
			transparent 1.6px
		);
	}
</style>
