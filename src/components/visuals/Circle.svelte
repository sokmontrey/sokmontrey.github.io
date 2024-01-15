<script>
	import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let ref;

  const _x = tweened(0, { duration: 1000, easing: cubicOut });
  const _y = tweened(0, { duration: 1000, easing: cubicOut });
  const _r = tweened(10, { duration: 1000, easing: cubicOut });

  $: _x.set(ref.pos.x);
  $: _y.set(ref.pos.y);
  $: _r.set(ref.r);
</script>

<circle cx={$_x} cy={$_y} r={$_r} />
