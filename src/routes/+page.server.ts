import { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const allPostFiles = import.meta.glob('/src/content/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const resolvedPost = await resolver();
			const { html } = resolvedPost.default.render();
			const postPath = path.slice(13, -3);

			return {
				meta: resolvedPost.metadata,
				slug: postPath,
				html: html
			};
		})
	);
	console.log(allPosts);
	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return {
		posts: sortedPosts
	};
};
