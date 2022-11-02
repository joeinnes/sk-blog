<script lang="ts">
	import { page_bg } from '$lib/stores/page-bg';
	import { page } from '$app/stores';
	let h: number,
		s: number,
		l: number,
		font: string,
		fontImport: string,
		lightBg: string,
		accent: string,
		darkText: string,
		semiDarkText: string;
	$: {
		({ h, s, l, font, fontImport } = $page.data);
		$page_bg = `hsl(${h}, ${s}%, ${l}%)`;
		lightBg = `hsl(${h}, ${s}%, 97%)`;
		accent = `hsl(${h}, ${s}%, 50%)`;
		darkText = `hsl(${h}, ${s}%, 15%)`;
		semiDarkText = `hsl(${h}, ${s}%, 25%)`;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href={fontImport} />
</svelte:head>

<article
	class="max-w-[100ch] prose prose-zinc print:prose-sm rounded-xl px-4 md:px-12 pt-8 -mt-28 mx-auto"
	style="--light-bg: {lightBg}; --accent: {accent}; --dark-text: {darkText}; --semi-dark-text: {semiDarkText}; --font: {font ??
		''}"
>
	<slot />
</article>

<style>
	article {
		background-color: var(--light-bg);
		color: var(--dark-text);
		font-family: var(--font);
		@apply transition-colors;
		box-decoration-break: clone;
	}
</style>
