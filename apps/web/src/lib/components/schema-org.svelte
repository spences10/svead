<script lang="ts">
	import type { SchemaOrgProps } from './schema-org-props';

	export let schemaOrgProps: SchemaOrgProps;

	const mainEntity = schemaOrgProps.mainEntity;
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': mainEntity.type,
		name: mainEntity.name,
		url: mainEntity.url,
		headline: mainEntity.headline,
		description: mainEntity.description,
		image: mainEntity.image,
		datePublished: mainEntity.datePublished,
		dateModified: mainEntity.dateModified,
		author: {
			'@type': mainEntity.author.type,
			name: mainEntity.author.name,
			url: mainEntity.author.url,
		},
		publisher: {
			'@type': mainEntity.publisher.type,
			name: mainEntity.publisher.name,
			logo: mainEntity.publisher.logo,
		},
	};

	const jsonLdString = JSON.stringify(jsonLd);
	const jsonLdScript = `
    <script type="application/ld+json">
      ${jsonLdString}
		${'<'}/script>
  `;
</script>

<svelte:head>
	{@html jsonLdScript}
</svelte:head>
