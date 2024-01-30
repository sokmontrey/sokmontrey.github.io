<script>
	import signal from "@/utils/signal";

	let init_h;
	let duration = 1000;
	const animate_h = signal(0);

	let is_collapsed = true;
	function toggleCollapse() {
		if (is_collapsed) {
			is_collapsed = false;
			animate_h.toNow(init_h, { duration });
		} else {
			is_collapsed = true;
			animate_h.toNow(0, { duration });
		}
	}

	function getChildHeight(node) {
		init_h = node.offsetHeight * 2;
	}
</script>

<button on:click={toggleCollapse} class="flex flex-row items-center">
	{#if is_collapsed}
		<i class="fa-solid fa-chevron-right mr-4"></i>
	{:else}
		<i class="fa-solid fa-chevron-down mr-4"></i>
	{/if}
	<slot name="toggler" />
</button>

<div class="overflow-hidden" style={`max-height: ${$animate_h}px;`}>
	<div use:getChildHeight>
		<slot />
	</div>
</div>
