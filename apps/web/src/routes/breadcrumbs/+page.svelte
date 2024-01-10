<script lang="ts">
	import {
		Head,
		type AuthorEntity,
		type BreadcrumbItem,
		type PublisherEntity,
		type SeoConfig,
	} from 'svead';

	// Define the breadcrumb items
	const breadcrumbs: BreadcrumbItem[] = [
		{ name: 'Home', url: 'https://example.com/' },
		{ name: 'Category', url: 'https://example.com/category' },
		{
			name: 'Subcategory',
			url: 'https://example.com/category/subcategory',
		},
		// The last item usually represents the current page
		{
			name: 'Current Page',
			url: 'https://example.com/category/subcategory/current-page',
		},
	];

	// Define the author
	const author: AuthorEntity = {
		'@type': 'Person',
		name: 'Jane Webwriter',
		url: 'https://example.com/authors/jane-webwriter',
	};

	// Define the publisher
	const publisher: PublisherEntity = {
		'@type': 'Organization',
		name: 'Example Publisher',
		url: 'https://example.com',
		logo: 'https://example.com/images/logo.png',
	};

	const seo_config: SeoConfig = {
		url: 'https://example.com/web-page',
		title: 'Web Page',
		description: 'This is a sample web page.',
		open_graph_image: 'https://example.com/images/sample-image.jpg',
		main_entity: {
			name: 'Web Page Title',
			url: 'https://example.com/web-page',
			description: 'This is a sample web page.',
			'@type': 'WebPage',
			headline: 'Sample Web Page Headline',
			image: 'https://example.com/images/sample-image.jpg',
			author,
			publisher,
			datePublished: '2023-04-05T10:00:00Z',
			dateModified: '2023-04-05T12:00:00Z',
			breadcrumb: {
				'@type': 'BreadcrumbList',
				itemListElement: breadcrumbs.map((item, index) => ({
					'@type': 'ListItem',
					position: index + 1,
					item,
				})),
			},
		},
	};
</script>

<Head {seo_config} />

<h1>Current Page</h1>
<p>This is the content of the current page.</p>
