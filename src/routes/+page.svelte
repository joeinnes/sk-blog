<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import type { PageData } from './$types';
	import { dateFormatter } from '$lib/utils/utils';
	export let data: PageData;
	const { posts } = data;
	import { page_bg } from '$lib/stores/page-bg';
	$page_bg = 'white';
	let searchString = '';
	let search = true;
</script>

<div class="mb-8 flex gap-8 place-items-center">
	<h1 class="text-5xl font-bold">Joe Innes's Blog</h1>
	{#if search}
		<input
			bind:value={searchString}
			class="rounded-full border py-2 px-4 w-64 outline-black text-xl"
			placeholder="Search..."
		/>
	{/if}
</div>

<div class="post-list text-ellipsis overflow-hidden" use:autoAnimate>
	{#each posts as post}
		{#if !post.meta.draft && post?.meta?.title
				?.toLowerCase()
				.indexOf(searchString.toLowerCase()) > -1}
			<article class="post">
				<h2 class="post-title"><a href="/{post.slug}">{post.meta.title}</a></h2>
				<p class="post-date">{dateFormatter(post.meta.date)}</p>
				{#if post.meta.excerpt}
					<p class="post-excerpt">{post.meta.excerpt}</p>
				{/if}
			</article>
		{/if}
	{/each}
</div>

<style>
	.post-list {
		@apply flex flex-col divide-y px-4 lg:px-0;
	}
	.post-list .post:first-child {
		@apply pt-0;
	}
	.post {
		@apply py-8;
	}
	.post-title {
		@apply font-bold text-2xl;
	}
	.post-date {
		@apply font-light text-sm text-gray-500;
	}
</style>
