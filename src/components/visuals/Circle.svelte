<script>
	import Rect from "@/components/visuals/Rect.svelte";

	/** @type {Object} style - Style object
	 * Use regular css properties name and values
	 *
	 * @example
	 * 'background-color': 'red',
	 */
	export let style = {};

	/** @type {number} r */
	export let r = null;
</script>

<Rect
	style={{
		...style,
		"border-radius": "100%",
		width: style["width"] || `calc(2 * ${r})`,
		height: style["height"] || `calc(2 * ${r})`,
	}}
	{...$$restProps}
>
	<slot w={r * 2} h={r * 2} />
</Rect>
