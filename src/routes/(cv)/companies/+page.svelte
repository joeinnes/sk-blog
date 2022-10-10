<script lang="ts">
	import { companies, type Company } from '$lib/companies';
</script>

{#each Object.keys(companies) as company}
	<div class="hidden">
		<a href="/cv/{company}">{company}</a>
	</div>
{/each}
