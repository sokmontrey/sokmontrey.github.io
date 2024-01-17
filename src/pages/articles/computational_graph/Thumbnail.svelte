<script>
  import signal from "@/utils/signal.js";
  import Circle from "@/components/visuals/Circle.svelte";

  let circle = signal({ cx: 30, cy: 30, r: 10, fill: "gray" });
</script>

<button on:click={() => circle.toNow({ r: 40 })}>Move</button>

<svg viewBox="0 0 100 100">
  <Circle {...$circle} />
</svg>
