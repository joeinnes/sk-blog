<script>
	import { page } from '$app/stores';
	import Address from '$lib/components/Address.svelte';
	import Signature from '$lib/components/Signature.svelte';
</script>

<div class="p-12 print:p-0 pt-0 prose screen:prose-lg mx-auto">
	<Address />
	<p class="text-right">
		<a href="/cv/{$page.data.company}" class="no-underline border rounded-xl p-2 cv-link">C.V.</a>
	</p>
	<slot />
	<Signature />
	Joe Innes
</div>

<style>
	.cv-link {
		@apply transition-colors print:hidden;
		border-color: var(--dark-text);
	}
	.cv-link:hover {
		background: var(--accent);
		color: var(--light-bg);
		border-color: var(--accent);
	}
</style>
