<script>
	export let stroke_size = 2;
	export let length = 50;
	export let color = "var(--nt-color)";
	export let dir = "down";

	let tip_style = `
	color: ${color};
	`;
</script>

<div
	{...$$restProps}
	class="flex justify-center items-center"
	style={`
		flex-direction: ${dir === "down" || dir === "up" ? "column" : "row"};
	`}
>
	{#if dir === "up"}
		<i class="fa-solid fa-chevron-up translate-y-3 " style={tip_style}></i>
	{:else if dir === "left"}
		<i class="fa-solid fa-chevron-left translate-y-2 " style={tip_style}></i>
	{/if}

	<div
		style={`
		width: ${dir === "down" || dir === "up" ? stroke_size : length}px;
		height: ${dir === "down" || dir === "up" ? length : stroke_size}px;
		background-color: ${color};
		`}
	/>

	{#if dir === "down"}
		<i class="fa-solid fa-chevron-down -translate-y-3 " style={tip_style}></i>
	{:else if dir === "right"}
		<i class="fa-solid fa-chevron-right -translate-x-2 " style={tip_style}></i>
	{/if}
</div>
