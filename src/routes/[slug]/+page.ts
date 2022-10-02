import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await import(`/src/content/${params.slug}.md`);
	const { title, date } = post.metadata;
	const content = post.default;

	return {
		content,
		...post.metadata
	};
};
