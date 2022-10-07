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
	let hovering = -1;
	$: if (search && searchbar) {
		searchbar.focus();
	}
</script>

<div class="max-w-[70ch]">
	<div class="mb-8 flex gap-8 place-items-center px-4 lg:px-0" use:autoAnimate>
		{#if search}
			<input
				bind:this={searchbar}
				bind:value={searchString}
				on:blur={() => (search = false)}
				class="absolute right-0 left-0 top-0 bottom-0 border-b-2 outline-none text-xl focus-within:border-b-black transition-colors"
				placeholder="Search..."
			/>
		{/if}
		<h1 class="text-3xl lg:text-5xl font-bold text-clip">Joe Innes's Blog</h1>

		<div>
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
	</div>

	<div
		class="post-list text-ellipsis overflow-hidden"
		use:autoAnimate
		style="--border-bottom-hover: black"
	>
		{#each posts as post, i}
			{#if post?.title?.toLowerCase().indexOf(searchString.toLowerCase()) > -1}
				<a href="/{post.slug}">
					<article class="post hvr-underline-from-left w-full">
						<div class="flex-1 py-8">
							<h2 class="post-title">{post.title}</h2>
							<p class="post-date">{dateFormatter(post.date)}</p>
							{#if post.excerpt}
								<p class="post-excerpt">{post.excerpt}</p>
							{/if}
						</div>
					</article>
				</a>
			{/if}
		{/each}
	</div>
</div>

<style>
	.post-list {
		@apply flex flex-col divide-y px-4 lg:px-0;
	}
	.post-list .post:first-child {
		@apply pt-0;
	}
	.post {
		@apply flex;
	}
	.post-title {
		@apply font-bold text-xl lg:text-2xl;
	}
	.post-date {
		@apply font-light text-sm text-gray-500;
	}

	.post-excerpt {
		@apply font-light text-gray-700;
	}

	.hvr-underline-from-left {
		display: inline-block;
		vertical-align: middle;
		-webkit-transform: perspective(1px) translateZ(0);
		transform: perspective(1px) translateZ(0);
		box-shadow: 0 0 1px rgba(0, 0, 0, 0);
		position: relative;
		overflow: hidden;
	}
	.hvr-underline-from-left:before {
		content: '';
		position: absolute;
		z-index: -1;
		left: 0;
		right: 100%;
		bottom: 0;
		background: var(--border-bottom-hover);
		height: 4px;
		-webkit-transition-property: right;
		transition-property: right;
		-webkit-transition-duration: 0.2s;
		transition-duration: 0.2s;
		-webkit-transition-timing-function: ease-out;
		transition-timing-function: ease-out;
	}
	.hvr-underline-from-left:hover:before,
	.hvr-underline-from-left:focus:before,
	.hvr-underline-from-left:active:before {
		right: 0;
	}
</style>
