import { error } from '@sveltejs/kit';

export const load = async () => {
	const slug = 'blog-posting-copy';
	try {
		const Copy = await import(`../../lib/copy/${slug}.md`);
		return {
			Copy: Copy.default,
		};
	} catch (e) {
		throw error(404, 'Uh oh!');
	}
};
