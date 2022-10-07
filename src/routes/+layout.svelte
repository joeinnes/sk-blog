<script lang="ts">
	import '../app.css';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { page_bg } from '$lib/stores/page-bg';

	let url = $page.url;
</script>

<svelte:head><title>Joe Innes{$page.data.title ? ' | ' + $page.data.title : ''}</title></svelte:head
>

<div
	style="
  --page-background: {$page.routeId === '(main)' ? 'white' : $page_bg};
"
	class="page_bg"
>
	<header>
		<nav>
			<a href={$page.routeId?.startsWith('(cv)') ? '/cv' : '/'} class="logo">JI</a>
		</nav>
	</header>

	{#key url}
		<main in:fly={{ x: -5, duration: 2000, delay: 2000 }} out:fly={{ x: 5, duration: 2000 }}>
			<slot />
		</main>
	{/key}
</div>

<style>
	.page_bg {
		background: var(--page-background);
		@apply bg-cover bg-center transition-colors min-h-screen print:min-h-0;
	}
	main {
		@apply px-4 pb-8 pt-32 print:pt-8 lg:pt-8 container mx-auto grid place-items-center;
	}

	header {
		@apply print:hidden py-2 print:my-0 my-10 md:my-0 pl-8 pr-3 md:px-4 md:py-4 fixed z-10 rounded-r-xl bg-[#ffffffcc] md:bg-inherit;
	}

	.logo {
		@apply border-2 border-black md:border-4 px-2 p-1 md:p-4 font-bold text-2xl md:text-4xl aspect-square flex items-center justify-center bg-white w-12 md:w-20;
	}
</style>
