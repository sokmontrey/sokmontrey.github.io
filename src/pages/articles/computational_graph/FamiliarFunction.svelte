<script>
	import signal from "@/utils/signal";
	import Katex from "svelte-katex";
	import Arrow from "@/components/visuals/Arrow.svelte";

	const x = signal(0);
	$: y = $x ** 2;
</script>

<div class="flex justify-center items-center my-5">
	<button
		on:click={() => $x = Math.random() * 200 - 100}
		class="p-4 bg-bg-color border border-dashed border-[3px] border-gray-500 hover:border-[var(--pm-color)] font-mono flex"
	>
		{$x.toFixed(2)}
	</button>
	<Arrow dir="right" class="px-3 opacity-50 " />
	<div class="p-4 bg-bg-color border border-[3px] border-gray-500 text-center ">
		<Katex>f({$x.toFixed(2)}) = {$x.toFixed(2)}^2</Katex>
	</div>
	<Arrow dir="right" class="px-3 opacity-50 " />
	<div
		class="p-4 bg-bg-color border border-dashed border-[3px] border-gray-500 font-mono"
	>
		{y.toFixed(2)}
	</div>
</div>
