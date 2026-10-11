<script lang="ts">
	import { groups, href_of, pages_in } from '#lib/docs/pages.js';

	// The slug of the page being read, if any
	let { current }: { current?: string } = $props();
</script>

<nav aria-label="Documentation" class="text-[0.9375rem]">
	{#each groups as group (group.id)}
		<p class="mt-6 mb-1.5 font-display font-bold first:mt-0">
			{group.label}
		</p>
		<ul class="border-l border-base-300">
			{#each pages_in(group.id) as page (page.slug)}
				<li>
					<a
						href={href_of(page)}
						aria-current={page.slug === current ? 'page' : undefined}
						class="-ml-px block border-l-2 border-transparent py-1 pl-3 text-muted hover:border-base-content hover:text-base-content aria-[current]:border-secondary aria-[current]:font-semibold aria-[current]:text-base-content"
					>
						{page.title}
					</a>
				</li>
			{/each}
		</ul>
	{/each}
</nav>
