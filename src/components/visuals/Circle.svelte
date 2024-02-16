<script>
  let w = 0;
</script>

<div
  bind:clientWidth={w}
	{...$$restProps}
	style={`
    height: ${w}px;
		border-radius: 100%;
	`}
>
	<slot />
</div>
