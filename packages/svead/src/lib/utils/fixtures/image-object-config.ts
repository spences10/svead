import type { SchemaOrgImageObject } from '$lib/types/schema-org.js';

export const image_object_config: SchemaOrgImageObject = {
	'@type': 'ImageObject',
	'@id': 'https://example.com/image',
	inLanguage: 'en',
	url: 'https://example.com/image.jpg',
	contentUrl: 'https://example.com/image.jpg',
	width: 1200,
	height: 800,
	caption: 'Example Image',
};
