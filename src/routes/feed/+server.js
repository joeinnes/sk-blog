const siteURL = 'https://joeinn.es';
const baseURL = 'joeinn.es';
const siteTitle = 'Joe Innes';
const siteDescription = "Joe Innes's Blog";

export const prerender = true;

export const GET = async () => {
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
	const sortedPosts = allPosts
		.sort((a, b) => {
			return new Date(b.meta.date) - new Date(a.meta.date);
		})
		.filter((post) => !post?.meta.draft);
	const body = render(sortedPosts);
	const options = {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	};

	return new Response(body, options);
};

const render = (posts) => {
	return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteURL}</link>
<atom:link href="${siteURL}/feed" rel="self" type="application/rss+xml"/>
${posts
	.map((post) => {
		let image = `https://cdn.statically.io/og/${post.meta.title}.jpg`;
		if (post.meta.featured_image) {
			image = `${siteURL}${post.meta.featured_image}`;
		}
		return `<item>
<guid isPermaLink="true">${siteURL}/${post.slug}</guid>
<title>${post.meta.title}</title>
<link>${siteURL}/${post.slug}</link>
<description><![CDATA[<br/><img src="${image}" alt="${post.meta.title}" /><br/>
]]>${post.meta.excerpt ?? post.meta.title}</description>
<pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
</item>`;
	})
	.join('')}
</channel>
</rss>`;
};
