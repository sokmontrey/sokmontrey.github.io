<script>
	export let r = "100px";
	export let fill = "var(--nt-color)";
</script>

<div
	{...$$restProps}
	style={`
		width: ${r};
		height: ${r};
		border-radius: 100%;
		background-color: ${fill};
	`}
>
	<slot />
</div>
