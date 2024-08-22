<script lang="ts">
	import { page } from '$app/stores';
	import {
		Head,
		SchemaOrg,
		type SchemaOrgProps,
		type SeoConfig,
	} from 'svead';

	const get_current_iso_date = () => new Date().toISOString();

	const seo_config: SeoConfig = {
		url: $page.url.href,
		website: 'https://example.com',
		title: 'How to Use Structured Data in SvelteKit',
		description:
			'Learn how to implement structured data in your SvelteKit project for better SEO.',
		open_graph_image:
			'https://example.com/images/structured-data-cover.jpg',
		author_name: 'Jane Doe',
		language: 'en',
		twitter_handle: '@janedoe',
		site_name: 'SvelteKit SEO Guide',
	};

	const schema_org: SchemaOrgProps['schema'] = {
		'@type': 'WebPage',
		'@id': $page.url.href,
		url: $page.url.href,
		name: seo_config.title,
		description: seo_config.description,
		inLanguage: seo_config.language,
		...(seo_config.website && {
			isPartOf: {
				'@type': 'WebSite',
				'@id': seo_config.website,
			},
		}),
		...(seo_config.open_graph_image && {
			primaryImageOfPage: {
				'@type': 'ImageObject',
				url: seo_config.open_graph_image,
			},
		}),
		datePublished: get_current_iso_date(),
		dateModified: get_current_iso_date(),
		author: {
			'@type': 'Person',
			name: seo_config.author_name,
			...(seo_config.website && {
				url: `${seo_config.website}/author/${seo_config.author_name?.toLowerCase().replace(' ', '-')}`,
			}),
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
					name: 'Blog',
					item: `${seo_config.website}/blog`,
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: seo_config.title,
					item: $page.url.href,
				},
			],
		},
		mainEntity: {
			'@type': 'BlogPosting',
			'@id': `${$page.url.href}#article`,
			headline: seo_config.title,
			description: seo_config.description,
			...(seo_config.open_graph_image && {
				image: seo_config.open_graph_image,
			}),
			datePublished: get_current_iso_date(),
			dateModified: get_current_iso_date(),
			author: {
				'@type': 'Person',
				name: seo_config.author_name,
				...(seo_config.website && {
					url: `${seo_config.website}/author/${seo_config.author_name?.toLowerCase().replace(' ', '-')}`,
				}),
			},
			publisher: {
				'@type': 'Organization',
				name: seo_config.site_name,
				...(seo_config.website && { url: seo_config.website }),
				...(seo_config.website && {
					logo: {
						'@type': 'ImageObject',
						url: `${seo_config.website}/logo.png`,
					},
				}),
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': $page.url.href,
			},
			inLanguage: seo_config.language,
			keywords: ['SvelteKit', 'SEO', 'Structured Data', 'JSON-LD'],
			articleSection: 'Web Development',
		},
	};
</script>

<Head {seo_config} />
<SchemaOrg schema={schema_org} />

<article>
	<nav aria-label="Breadcrumb">
		<ol>
			<li><a href={seo_config.website}>Home</a></li>
			<li><a href={`${seo_config.website}/blog`}>Blog</a></li>
			<li>{seo_config.title}</li>
		</ol>
	</nav>

	<h1>{seo_config.title}</h1>
	<p>{seo_config.description}</p>

	<!-- Rest of your blog post content -->
	<section>
		<h2>Introduction to Structured Data</h2>
		<p>
			Structured data helps search engines understand the content of
			your web pages...
		</p>
	</section>

	<section>
		<h2>Implementing JSON-LD in SvelteKit</h2>
		<p>Here's how you can add JSON-LD to your SvelteKit project...</p>
	</section>

	<!-- More sections... -->

	<footer>
		<p>Author: {seo_config.author_name}</p>
		<p>Published: {new Date().toLocaleDateString()}</p>
	</footer>
</article>
