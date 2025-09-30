import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { slug } = params;
	try {
		const Copy = await import(`../../lib/copy/${slug}.md`);
		return {
			Copy: Copy.default,
			slug,
		};
	} catch (e) {
		throw error(404, `Documentation page "${slug}" not found`);
	}
};
