<script>
	import signal, { delay, all } from "@/utils/signal";
	import { getRootColor } from "@/utils/color";
	import { onMount } from "svelte";

	const circle = signal({ pos: 0, opa: 1, fill: 'white' });
	const rect = signal({ pos: 0, opa: 0, fill: 'white' });

	onMount(() => {
		circle.toNow({ fill: getRootColor("--nt-color") });
		rect.toNow({ fill: getRootColor("--nt-color") });
	});

	let h;
	let turn = 0;
	let running = false;
	async function move() {
		if (running) return;
		running = true;
		if (turn === 0) {
			await move0();
			turn = 1;
		} else {
			await move1();
			turn = 0;
		}
		running = false;
	}
	async function move0() {
		await all(
			circle.to({ pos: h / 1.2, fill: getRootColor("--ac2-color") }),
			rect.to({ opa: 0 }),
		);
		await rect.toNow({ pos: 0, fill: getRootColor("--nt-color") });
		await rect.to({ opa: 1 }, { duration: 500 });
	}
	async function move1() {
		await all(
			rect.to({ pos: h / 1.2, fill: getRootColor("--ac1-color") }),
			circle.to({ opa: 0 }),
		);
		await circle.toNow({ pos: 0, fill: getRootColor("--nt-color") });
		await circle.to({ opa: 1 }, { duration: 500 });
	}
</script>

<div bind:clientHeight={h} class="flex flex-col items-center py-20 my-10">
	<div
		class="rounded-[100%] w-8 h-8 absolute"
		style={`
			background-color: ${$circle.fill};
			top: ${$circle.pos}px;
			opacity: ${$circle.opa};
			left: auto;
		`}
	></div>
	<div
		class="w-8 h-8 absolute"
		style={`
			background-color: ${$rect.fill};
			top: ${$rect.pos}px;
			opacity: ${$rect.opa};
			left: auto;
		`}
	></div>
	<button on:click={move} class="hover:text-[var(--pm-color)]">
		<span
			class="font-mono text-4xl font-bold py-10 px-2 border-dashed border-gray-500 border-r-4 mr-5"
			>FUNC</span
		>
		<span
			class="font-mono text-4xl font-bold py-10 px-2 border-dashed border-gray-500 border-l-4 ml-5"
			>TION</span
		>
	</button>
</div>
