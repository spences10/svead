<script lang="ts">
	import type { JsonLdMainEntity } from '$lib/types.js';
	import type { SchemaOrgProps } from './schema-org-props.js';

	export let schemaOrgProps: SchemaOrgProps;

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
		mainEntity: { type, headline },
		breadcrumbs,
	} = schemaOrgProps;

	const jsonLd: JsonLdMainEntity = {
		'@context': 'https://schema.org',
		'@type': type,
		type: type,
		name: title,
		headline: headline,
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
		// ... include additional properties as needed
	};

	// Adding breadcrumbs if they exist
	if (breadcrumbs && breadcrumbs.length) {
		jsonLd['breadcrumb'] = {
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

<svelte:element this="script" type="application/ld+json">
	{@html JSON.stringify(jsonLd)}
</svelte:element>
