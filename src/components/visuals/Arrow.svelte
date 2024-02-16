<script>
	export let stroke_size = "2px";
	export let length = "20px";
	export let dir = "down";

  export let body_class = "";
  export let container_class = "";
  export let tip_class = "";
</script>

<div
	{...$$restProps}
  class={container_class}
	style={`
	display: flex;
	justify-content: center;
	align-items: center;
		flex-direction: ${dir === "down" || dir === "up" ? "column" : "row"};
	`}
>
	{#if dir === "up"}
    <i class={"fa-solid fa-chevron-up translate-y-3 " + tip_class}></i>
	{:else if dir === "left"}
    <i class={"fa-solid fa-chevron-left translate-y-2 " + tip_class}></i>
	{/if}

	<div
		style={`
		width: ${dir === "down" || dir === "up" ? stroke_size : length};
		height: ${dir === "down" || dir === "up" ? length : stroke_size};
    `}
    class={body_class}
	/>

	{#if dir === "down"}
    <i class={"fa-solid fa-chevron-down -translate-y-3 "+tip_class}></i>
	{:else if dir === "right"}
    <i class={"fa-solid fa-chevron-right -translate-x-2 "+tip_class}></i>
	{/if}
</div>
