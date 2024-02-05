<script>
	import Circle from "@/components/visuals/Circle.svelte";
	import Arrow from "@/components/visuals/Arrow.svelte";
	import Katex from "svelte-katex";
	import { interpolate } from "d3-interpolate";

	const px = "px";

	let w;
	$: r = w * 0.08;

	function color(t) {
		return interpolate("#85ff9e", "#1a58d3")(t);
	}
</script>

<div
	bind:clientWidth={w}
	class="w-full h-full flex justify-center items-center my-10 "
>
	<Circle r={r + px} fill={color(0)} class="flex justify-center items-center bg-color ">
		<Katex>x</Katex>
	</Circle>
	<Arrow dir="right" class="pl-3" />
	<Circle r={r + px} fill={color(0.3)} class="flex justify-center items-center bg-color ">
		<Katex>\times 5</Katex>
	</Circle>
	<Arrow dir="right" class="pl-3" />
	<Circle r={r + px} fill={color(0.6)} class="flex justify-center items-center bg-color "
	>
		<Katex>+ 3</Katex>
	</Circle>
	<Arrow dir="right" class="pl-3" />
	<Circle r={r + px} fill={color(1)} class="flex justify-center items-center nt-color "
	>
		<Katex>e^x</Katex>
	</Circle>
	<Arrow dir="right" class="pl-3" />
	<Circle r={r + px} fill="" class="flex justify-center items-center nt-color ">
		<Katex>f</Katex>
	</Circle>
</div>
