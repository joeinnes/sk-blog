import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';
import fs from 'fs';

const allPostFiles = fs.readdirSync('./src/content').map((el) => '/' + el.slice(0, -3));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*', ...allPostFiles],
			onError: ({ status, path, referrer, referenceType }) => {
				if (path.startsWith('/content/images')) {
					console.warn('Missing an image!');
					console.warn(
						`${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ''}`
					);
					return;
				} else {
					console.error(
						`${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ''}`
					);
				}
			}
		}
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [[rehypeExternalLinks, { rel: 'external', target: '_blank' }]]
		})
	]
};

export default config;
