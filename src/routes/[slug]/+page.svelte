<script lang="ts">
	import { page } from '$app/stores';
	import { page_bg } from '$lib/stores/page-bg';
	import { getAverageRGB } from '$lib/actions/getAverageRGB';
	import type { PageData } from './$types';
	import Signature from '$lib/components/Signature.svelte';
	let bg: string;
	const { slug } = $page.params;
	export let data: PageData;
	let img: HTMLImageElement;
	const dateFormatter = (dateStr: string) => {
		const date = new Date(dateStr);
		if (!(date instanceof Date)) return '';
		const formattedDate = new Intl.DateTimeFormat('en-GB', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: 'numeric',
			dayPeriod: 'short',
			hour12: true
		}).format(date);
		return formattedDate;
	};
	$page_bg = $page.data.page_bg;
</script>

<svelte:head><title>Joe Innes | {data.title}</title></svelte:head>
<article
	style="
  --content-bg-colour: {data.content_bg_colour || 'white'};
  background-color: var(--content-bg-colour);
  "
	class="prose lg:prose-xl prose-headings:font-bold prose-zinc article"
>
	<div
		class="aspect-[21/9] header-image content pb-6"
		class:darken-bottom={data.title_overlays_featured_image}
		style="
        background-image: url('{data.featured_image ??
			'https://source.unsplash.com/random/?' + data.title}')
      "
	>
		{#if !$page_bg}
			<img
				class="hidden"
				src={data.featured_image ?? 'https://source.unsplash.com/random/?' + data.title}
				use:getAverageRGB={page_bg}
				aria-hidden="true"
				alt="hidden"
			/>
		{/if}
		{#if data.title_overlays_featured_image}
			<hgroup class="text-white header-on-image">
				<h1 class="text-4xl text-white mb-0 lg:mb-0">{data.title}</h1>
				<small>{dateFormatter(data.date)}</small>
			</hgroup>
		{/if}
	</div>
	<div class="content py-8">
		{#if !data.title_overlays_featured_image}
			<hgroup class="mb-8">
				<h1 class="mb-0 lg:mb-0 font-bold">{data.title}</h1>
				<small>{dateFormatter(data.date)}</small>
			</hgroup>
		{/if}
		<svelte:component this={data.content} />
		<div class="flex justify-end" style="color: {$page_bg}">
			<Signature />
		</div>
	</div>
</article>

<style>
	:global(.article) {
		@apply rounded-xl mx-auto drop-shadow-2xl relative overflow-hidden bg-white max-w-[75ch];
	}

	.header-image {
		@apply bg-cover bg-center shadow justify-start items-end;
	}

	.header-on-image {
		text-shadow: 8px 8px 12px #000000;
	}

	.content {
		@apply grid gap-x-4 max-w-full;
		grid-template-columns: 1fr min(55ch, 100%) 1fr;
	}

	:global(.content > *) {
		grid-column: 2;
	}

	:global(img, .full-bleed, p:has(img)) {
		@apply max-w-full w-full;
		grid-column: 1 / -1 !important;
	}
</style>
