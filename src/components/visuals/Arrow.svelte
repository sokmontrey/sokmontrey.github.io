<script>
	export let stroke_size = 2;
	export let length = 50;
	export let tip_length = 10;
	export let color = 'var(--nt-color)';
</script>

<div {...$$restProps}>
	<div
		style={`
			width: ${stroke_size}px;
			height: ${length}px;
			background-color: ${color};
		`}
	></div>
	<div
		style={`
			width: ${stroke_size}px;
			height: ${tip_length}px;
			transform: translate(${tip_length /3}px, -${tip_length / 1.3}px) rotate(45deg) ;
			background-color: ${color};
		`}
		class="absolute"
	></div>
	<div
		style={`
			width: ${stroke_size}px;
			height: ${tip_length}px;
			transform: translate(-${tip_length /3}px, -${tip_length / 1.3}px) rotate(-45deg) ;
			background-color: ${color};
		`}
		class="absolute"
	></div>
</div>
