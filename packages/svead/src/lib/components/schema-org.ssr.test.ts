import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import SchemaOrg from './schema-org.svelte';

describe('SchemaOrg SSR', () => {
	it.each([
		'</script><script>window.__xss = 1</script>',
		'</ScRiPt><script>window.__xss = 1</script>',
		'</script ><script>window.__xss = 1</script>',
		'<!--<script> & > " \\ \u2028 \u2029',
	])('safely serialises the headline %j', (headline) => {
		const { head } = render(SchemaOrg, {
			props: {
				schema: {
					'@type': 'Article',
					headline,
				},
			},
		});

		expect(head.match(/<script\b/gi)).toHaveLength(1);
		expect(head.match(/<\/script\s*>/gi)).toHaveLength(1);

		// No literal `<` may remain inside the JSON-LD script: even
		// comments can change how the HTML parser finds its closing tag.
		const script = head.match(
			/<script type="application\/ld\+json">([^<]*)<\/script>/,
		);
		expect(script).not.toBeNull();
		expect(JSON.parse(script?.[1] ?? '')).toEqual({
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline,
		});
	});
});
