<script>
	import Arrow from "@/components/visuals/Arrow.svelte";
	import signal, { all, delay } from "@/utils/signal";
	import { onMount } from "svelte";

	const circle = signal({ opa: 1, pos: -16 * 2, fill: "blue" });
	const circle2 = signal({ opa: 0, pos: -16 * 2, fill: "yellow" });

	let h;
</script>

<div
	bind:clientHeight={h}
	class="w-full h-full flex flex-col justify-center items-center my-20"
>
	<div
		class="rounded-[100%] w-8 h-8 absolute z-[0]"
		style={`
		top: ${$circle.pos}px;
		background-color: ${$circle.fill};
		opacity: ${$circle.opa};
		`}
	></div>
	<div
		class="rounded-[100%] w-8 h-8 absolute z-[0]"
		style={`
		top: ${$circle2.pos}px;
		background-color: ${$circle2.fill};
		opacity: ${$circle2.opa};
		`}
	></div>
	<Arrow class="my-2 z-[10]" color="var(--pm-color)" />
	<p class="p-8 bg-pm-color z-[10] inline-block rounded-md font-mono">
		Function
	</p>
	<Arrow class="my-2 z-[10]" color="var(--pm-color)" />
</div>
