<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { page_bg } from '$lib/stores/page-bg.ts';
</script>

<svelte:head><title>Joe Innes{$page.data.title ? ' | ' + $page.data.title : ''}</title></svelte:head>

<div style="
  --page-background: {$page.route === '/' ? 'white': $page_bg};
" class="page_bg">
<header>
  <nav>
    <a href="/" class="logo">JI</a>
  </nav>
</header>

<main>
  <slot />
</main>
</div>

<style>
  .page_bg {
    background: var(--page-background);
    @apply bg-cover bg-center transition-colors min-h-screen;
  }
  main {
    @apply px-4 py-8;
  }

  header {
    @apply py-2 my-10 lg:py-12 lg:my-0 pl-8 pr-3 lg:px-4 lg:py-4 fixed z-10 rounded-r-xl bg-[#ffffffcc] lg:bg-inherit;
  }

  .logo {
    @apply border-2 border-black lg:border-4 px-2 p-1 lg:p-4 font-bold text-2xl lg:text-3xl aspect-square inline-flex flex items-center justify-center bg-white;
  }
</style>