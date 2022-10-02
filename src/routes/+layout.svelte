<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { page_bg } from '$lib/stores/page-bg.ts';
</script>

<svelte:head><title>Joe Innes{$page.data.title && ' | ' + $page.data.title}</title></svelte:head>

<main style="
  --page-background: {$page_bg || $page.data.page_bg};
">
  <slot />
</main>

<style>
  main {
    background: var(--page-background);
    @apply px-4 py-12 min-h-screen bg-cover bg-center transition-colors;
  }

</style>