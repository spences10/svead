import { error } from '@sveltejs/kit';

export const load = async () => {
	const slug = 'index-copy';
	try {
		const Copy = await import(`../lib/${slug}.md`);
		return {
			Copy: Copy.default,
		};
	} catch (e) {
		throw error(404, 'Uh oh!');
	}
};
