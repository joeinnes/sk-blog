import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await import(
		/* @vite-ignore */
		`../../../content/${params.slug}.md`
	);

	const content = post.default;

	return {
		content,
		...post.metadata
	};
};
