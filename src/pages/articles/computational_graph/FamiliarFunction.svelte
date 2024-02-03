<script>
	import katex from 'katex';
	import Arrow from '@/components/visuals/Arrow.svelte';

	const html = katex.renderToString('f(x) = x^2');
</script>

<div class="flex justify-center items-center">
	<Arrow dir="right" class="px-5 " />
	<div class='p-4 bg-pm-color nt-color rounded'>
		{@html html}
	</div>
</div>
