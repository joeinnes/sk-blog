import type { PageServerLoad } from './$types';

import { getAllPosts } from '$lib/utils/utils';

export const load: PageServerLoad = async () => {
	const posts = await getAllPosts({
		drafts: false,
		scheduled: false
	});


	return {
		posts
	};
};
