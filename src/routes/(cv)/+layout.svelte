<script lang="ts">
	import type { PageData } from './$types';
	import { page_bg } from '$lib/stores/page-bg';
	export let data: PageData;
	let lightBg = `hsl(${data.h}, ${data.s}%, 97%)`;
	let accent = `hsl(${data.h}, ${data.s}%, 50%)`;
	let darkText = `hsl(${data.h}, ${data.s}%, 15%)`;
	let semiDarkText = `hsl(${data.h}, ${data.s}%, 25%)`;
	const { font, fontImport } = data;

	$page_bg = `hsl(${data.h}, ${data.s}%, ${data.l}%)`;
</script>

<svelte:head>
	<link rel="stylesheet" href={fontImport} />
</svelte:head>

<article
	class="max-w-[100ch] prose prose-zinc rounded-xl p-12 pt-4"
	style="--light-bg: {lightBg}; --accent: {accent}; --dark-text: {darkText}; --semi-dark-text: {semiDarkText}; --font: {font}"
>
	<slot />
</article>

<style>
	article {
		background-color: var(--light-bg);
		color: var(--dark-text);
		font-family: var(--font);
		@apply transition-colors;
	}
</style>
