<!-- 
	A lot of the inspiration for this component comes from Rodney Lab:
	https://github.com/rodneylab/sveltekit-blog-mdx/blob/a7d79aaff79132284dc300e592a98cc33043c4c2/src/lib/components/SEO/SchemaOrg.svelte
 -->

<script lang="ts">
	import type { SeoConfig } from '$lib/types/index.js';
	import type {
		SchemaOrgArticle,
		SchemaOrgBreadcrumbList,
		SchemaOrgEntity,
		SchemaOrgImageObject,
		SchemaOrgPublisher,
		SchemaOrgWebPage,
		SchemaOrgWebsite,
	} from '$lib/types/schema-org.js';

	const {
		schema_org_props,
	}: {
		schema_org_props: SeoConfig;
	} = $props();

	const {
		title,
		description,
		url,
		website,
		language,
		author_name,
		schema_org_entity,
		same_as,
		schema_org_website,
		schema_org_search_url_template,
		schema_org_image_object,
		schema_org_breadcrumb_list,
		schema_org_webpage,
		schema_org_article,
		schema_org_publisher,
	} = schema_org_props;

	// Generate SchemaOrgEntity
	const org_entity: SchemaOrgEntity = {
		'@type': ['Person', 'Organization'],
		'@id': `${website}/#/schema/person/`,
		name: author_name || '',
		image: schema_org_entity?.image || {
			'@type': 'ImageObject',
			'@id': `${website}/#personlogo`,
			inLanguage: language || 'en',
			url: schema_org_entity?.image?.url || '',
			width: schema_org_entity?.image?.width || 0,
			height: schema_org_entity?.image?.height || 0,
			caption: schema_org_entity?.image?.caption || '',
		},
		logo: {
			'@id': `${website}/#personlogo`,
		},
		sameAs: same_as || [],
	};

	// Generate SchemaOrgWebsite
	const org_website: SchemaOrgWebsite = {
		'@type': 'WebSite',
		'@id': `${website}/#website`,
		url: website || '',
		name: schema_org_website?.name || '',
		description: schema_org_website?.description || '',
		publisher: {
			'@id': `${website}/#/schema/person`,
		},
		potentialAction: schema_org_search_url_template
			? [
					{
						'@type': 'SearchAction',
						target: schema_org_search_url_template,
						'query-input': {
							'@type': 'PropertyValueSpecification',
							valueRequired: true,
							valueName: 'search_term_string',
						},
					},
				]
			: [],
		inLanguage: language || 'en',
	};

	// Generate SchemaOrgImageObject
	const org_image_object: SchemaOrgImageObject = {
		'@type': 'ImageObject',
		'@id': `${url}#primaryimage`,
		inLanguage: language || 'en',
		url: schema_org_image_object?.url || '',
		contentUrl: schema_org_image_object?.url || '',
		width: schema_org_image_object?.width || 0,
		height: schema_org_image_object?.height || 0,
		caption: schema_org_image_object?.caption || '',
	};

	// Generate SchemaOrgBreadcrumbList
	const org_breadcrumb_list: SchemaOrgBreadcrumbList = {
		'@type': 'BreadcrumbList',
		'@id': `${url}#breadcrumb`,
		itemListElement:
			schema_org_breadcrumb_list?.itemListElement.map(
				(element, index) => ({
					'@type': 'ListItem',
					position: index + 1,
					item: {
						'@id': element.item['@id'],
						'@type': 'WebPage',
						name: element.item.name,
						url: element.item.url,
					},
				}),
			) || [],
	};

	// Generate SchemaOrgWebPage
	const org_web_page: SchemaOrgWebPage = {
		'@type': 'WebPage',
		'@id': `${schema_org_webpage?.url}#webpage`,
		url,
		name: title,
		isPartOf: {
			'@id': `${schema_org_webpage?.url}/#website`,
		},
		primaryImageOfPage: {
			'@id': `${schema_org_webpage?.url}#primaryimage`,
		},
		datePublished: schema_org_webpage?.datePublished || '',
		dateModified: schema_org_webpage?.dateModified || '',
		author: {
			'@id': `${schema_org_webpage?.author['@id']}`,
		},
		description: schema_org_webpage?.description || '',
		breadcrumb: {
			'@id': `${schema_org_webpage?.url}#breadcrumb`,
		},
		inLanguage: language || 'en',
		potentialAction: [
			{
				'@type': 'ReadAction',
				target: [schema_org_webpage?.url!],
			},
		],
	};

	// Generate SchemaOrgArticle
	let org_article: SchemaOrgArticle | null = null;
	if (schema_org_article) {
		org_article = {
			'@type': 'Article',
			'@id': `${url}#article`,
			isPartOf: {
				'@id': `${url}#webpage`,
			},
			author: {
				'@id': `${website}/#/schema/person`,
			},
			headline: title,
			datePublished: schema_org_article?.datePublished || '',
			dateModified: schema_org_article?.dateModified || '',
			mainEntityOfPage: {
				'@id': `${url}#webpage`,
			},
			publisher: {
				'@id': `${website}/#/schema/person`,
			},
			image: {
				'@id': `${url}#primaryimage`,
			},
			articleSection: schema_org_article?.articleSection || ['blog'],
			inLanguage: language || 'en',
		};
	}

	// Generate SchemaOrgPublisher
	const org_publisher: SchemaOrgPublisher = {
		'@type': ['Person', 'Organization'],
		'@id': `${website}/#/schema/person`,
		name: schema_org_publisher?.name || '',
		image: schema_org_publisher?.image || {
			'@type': 'ImageObject',
			'@id': `${website}/#personlogo`,
			inLanguage: language || 'en',
			url: schema_org_publisher?.image?.url || '',
			width: schema_org_publisher?.image?.width || 0,
			height: schema_org_publisher?.image?.height || 0,
			caption: schema_org_publisher?.image?.caption || '',
		},
		logo: {
			'@id': `${website}/#personlogo`,
		},
		sameAs: same_as || [],
	};

	const schema_org_array = [
		org_entity,
		org_website,
		org_image_object,
		org_web_page,
		org_breadcrumb_list,
		...(org_article ? [org_article] : []),
		org_publisher,
	];
	const schema_org_object = {
		'@context': 'https://schema.org',
		'@graph': schema_org_array,
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(
		schema_org_object,
	)}</scr` + `ipt>`}
</svelte:head>
