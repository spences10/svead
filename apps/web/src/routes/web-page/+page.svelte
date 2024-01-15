<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		url: 'https://example.com/web-page',
		title: 'Web Page',
		description: 'This is a sample web page.',
		date_published: '2023-04-05T10:00:00Z',
		date_modified: '2023-04-05T12:00:00Z',
	};
</script>

<Head {seo_config} />
