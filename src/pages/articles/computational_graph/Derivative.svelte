<script>
	import {
		plotf,
		draw_to_svg,
		diagram_combine,
	} from "diagramatics";
	import { onMount } from "svelte";

	let draw = (...diagrams) => {
		draw_to_svg(mysvg, diagram_combine(...diagrams));
	};

	let mysvg;
	let controldiv;

	function divDraw(node) {
		controldiv = node;
	}

	function svgDraw(node) {
		mysvg = node;
	}

	onMount(() => {
		let axopt = {
			xrange: [-2 * Math.PI, 2 * Math.PI],
		};

		let f = (x) => Math.sin(x);
		let p = plotf(f, axopt);
		draw(p);
	});
</script>

<svg use:svgDraw></svg>
<div use:divDraw></div>
