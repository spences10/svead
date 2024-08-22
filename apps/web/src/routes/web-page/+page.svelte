<script lang="ts">
	import { page } from '$app/stores';
	import {
		Head,
		SchemaOrg,
		type SchemaOrgProps,
		type SeoConfig,
	} from 'svead';

	const seo_config: SeoConfig = {
		url: $page.url.href,
		website: 'https://example.com',
		title: 'Sample Web Page',
		description:
			'This is an example of a simple web page showcasing the usage of the svead package for SEO optimization.',
		open_graph_image: 'https://example.com/images/web-page-image.jpg',
		language: 'en',
		twitter_handle: '@example',
		site_name: 'Example Site',
	};

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		'@id': $page.url.href,
		url: $page.url.href,
		name: seo_config.title,
		description: seo_config.description,
		inLanguage: seo_config.language,
		isPartOf: {
			'@type': 'WebSite',
			'@id': seo_config.website,
		},
		primaryImageOfPage: {
			'@type': 'ImageObject',
			url: seo_config.open_graph_image,
		},
		datePublished: '2023-06-03T09:00:00Z',
		dateModified: '2023-06-03T11:30:00Z',
		author: {
			'@type': 'Person',
			name: 'John Doe',
			url: `${seo_config.website}/author/john-doe`,
		},
		publisher: {
			'@type': 'Organization',
			name: seo_config.site_name,
			url: seo_config.website,
			logo: {
				'@type': 'ImageObject',
				url: `${seo_config.website}/logo.png`,
			},
		},
		breadcrumb: {
			'@type': 'BreadcrumbList',
			'@id': `${$page.url.href}#breadcrumb`,
			name: 'Breadcrumb',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Home',
					item: seo_config.website,
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: seo_config.title,
					item: $page.url.href,
				},
			],
		},
		potentialAction: [
			{
				'@type': 'ReadAction',
				target: $page.url.href,
			},
		],
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />

<main>
	<h1>{seo_config.title}</h1>
	<p>{seo_config.description}</p>
	<!-- Rest of your page content -->
</main>
