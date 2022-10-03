<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import type { PageData } from './$types';
	import { dateFormatter } from '$lib/utils/utils';
	export let data: PageData;
	const { posts } = data;
	import { page_bg } from '$lib/stores/page-bg';
	$page_bg = 'white';
	let searchString = '';
	let search = false;
	let searchbar: HTMLInputElement;
	$: if (search && searchbar) {
		searchbar.focus();
	}
</script>

<div class="mb-8 flex gap-2 place-items-center" use:autoAnimate>
	<h1 class="text-5xl font-bold pr-8">Joe Innes's Blog</h1>

	{#if search}
		<input
			bind:this={searchbar}
			bind:value={searchString}
			class="border-b-2 py-2 px-4 w-64 outline-none text-xl focus-within:border-b-black transition-colors"
			placeholder="Search..."
		/>
	{/if}
	<div
		class="text-gray-300 hover:text-black transition-colors cursor-pointer"
		class:text-black={search}
		on:click={() => (search = !search)}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width={2}
			stroke="currentColor"
			class="w-8 h-8"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
	</div>
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
