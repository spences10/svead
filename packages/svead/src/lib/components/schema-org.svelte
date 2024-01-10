<script lang="ts">
	import type { JsonLdMainEntity } from '$lib/types.js';
	import type { SchemaOrgProps } from './schema-org-props/index.js';

	const { schema_org_props } = $props<{
		schema_org_props: SchemaOrgProps;
	}>();

	const {
		url,
		title,
		description,
		website,
		authorName,
		authorType,
		authorUrl,
		image,
		datePublished,
		dateModified,
		language,
		mainEntity,
		breadcrumbs,
	} = schema_org_props;

	const json_ld: JsonLdMainEntity = {
		'@context': 'https://schema.org',
		'@type': mainEntity['@type'],
		name: title,
		headline: mainEntity.headline,
		description: description,
		url: url,
		image: image || '',
		datePublished: datePublished || '',
		dateModified: dateModified || '',
		inLanguage: language,
		author: {
			'@type': authorType || 'Person',
			name: authorName || '',
			url: authorUrl || '',
		},
		publisher: {
			'@type': 'Organization',
			name: website || '',
			url: url,
			logo: image || '',
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url,
		},
	};

	// Adding breadcrumbs if they exist
	if (breadcrumbs && breadcrumbs.length) {
		json_ld['breadcrumb'] = {
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs.map((item, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				item: {
					'@id': item.url,
					name: item.name,
					url: item.url,
				},
			})),
		};
	}
</script>

<svelte:head>
	<svelte:element this="script" type="application/ld+json">
		{@html JSON.stringify(json_ld)}
	</svelte:element>
</svelte:head>
