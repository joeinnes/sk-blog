<script lang="ts">
  import type {PageData} from './$types';
  import { dateFormatter } from '$lib/utils/utils'
  export let data: PageData;
  const { posts } = data;
  import { page_bg } from '$lib/stores/page-bg';
  $page_bg = 'white';
</script>

<div class="post-list">
{#each posts as post}
  <article class="post">
  <h2 class="post-title"><a href="/{post.slug}">{post.meta.title}</a></h2>
  <p class="post-date">{dateFormatter(post.meta.date)}</p>
  {#if post.meta.excerpt}
    <p class="post-excerpt">{post.meta.excerpt}</p>
  {/if}
  </article>
{/each}
</div>

<style>
  .post-list {
    @apply flex flex-col divide-y pt-16 px-4 lg:px-0;
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