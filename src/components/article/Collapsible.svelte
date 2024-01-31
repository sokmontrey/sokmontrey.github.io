<script>
	import { slide } from "svelte/transition";
	import { cubicIn, cubicOut } from "svelte/easing";

	export let is_collapsed = true;
</script>

<button
	on:click={() => (is_collapsed = !is_collapsed)}
	class="flex flex-row items-center"
>
	{#if is_collapsed}
		<i class="fa-solid fa-chevron-right mr-4"></i>
	{:else}
		<i class="fa-solid fa-chevron-down mr-4"></i>
	{/if}
	<slot name="toggler" />
</button>

{#if !is_collapsed}
	<div
		in:slide={{ duration: 800, easing: cubicIn }}
		out:slide={{ duration: 800, easing: cubicOut }}
	>
		<slot />
	</div>
{/if}
