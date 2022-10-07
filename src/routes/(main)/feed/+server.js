import { getAllPosts } from '$lib/utils/utils';

const siteURL = 'https://joeinn.es';
const siteTitle = 'Joe Innes';
const siteDescription = "Joe Innes's Blog";

export const prerender = true;

export const GET = async () => {
	const allPostFiles = await getAllPosts({
		drafts: false,
		scheduled: false
	});
	const filteredPosts = allPostFiles.filter((post) => {
		try {
			if (post.draft) return false;
			if (new Date(post.date) > new Date()) return false;
			return true;
		} catch {
			// Something wrong with this post...
			return false;
		}
	});
	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteURL}</link>
<atom:link href="${siteURL}/feed" rel="self" type="application/rss+xml"/>
${filteredPosts
	.map((post) => {
		let image = `https://cdn.statically.io/og/${post.title}.jpg`;
		if (post.featured_image) {
			image = `${siteURL}${post.featured_image}`;
		}
		return `<item>
<guid isPermaLink="true">${siteURL}/${post.slug}</guid>
<title>${post.title}</title>
<link>${siteURL}/${post.slug}</link>
<description><![CDATA[<br/><img src="${image}" alt="${post.title}" /><br/>
]]>${post.excerpt ?? post.title}</description>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`;
	})
	.join('')}
</channel>
</rss>`;
	const options = {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	};

	return new Response(body, options);
};
