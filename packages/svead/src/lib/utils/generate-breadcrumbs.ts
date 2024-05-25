import type { ListItem } from '$lib/types/schema-org.js';

export const generate_breadcrumbs = (
	url: string | URL,
): ListItem[] => {
	const url_obj = new URL(url);
	const path_segments = url_obj.pathname
		.split('/')
		.filter(segment => segment.length > 0);
	const breadcrumb_list = [];

	path_segments.forEach((segment, index) => {
		let path = url_obj.origin;
		for (let i = 0; i <= index; i++) {
			path += '/' + path_segments[i];
		}

		breadcrumb_list.push({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@id': path,
				'@type': 'WebPage',
				name:
					segment.charAt(0).toUpperCase() +
					segment.slice(1).replace(/-/g, ' '), // Capitalize and replace hyphens with spaces
				url: path,
			},
		});
	});

	// Add the home page as the first item
	breadcrumb_list.unshift({
		'@type': 'ListItem',
		position: 1,
		item: {
			'@id': url_obj.origin,
			'@type': 'WebPage',
			name: 'Home',
			url: url_obj.origin,
		},
	});

	// Adjust positions
	breadcrumb_list.forEach((item, index) => {
		item.position = index + 1;
	});

	return breadcrumb_list as ListItem[];
};
