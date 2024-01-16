<script>
  import signal from "@/utils/signal.js";
  import Circle from "@/components/visuals/Circle.svelte";
  import { onMount } from "svelte";

  let circle = signal({ cx: 0, cy: 0, r: 10 });
</script>

<button
  on:click={async () => {
    await circle.to(({ cx }) => ({ cx: cx + 10 }));
  }}>Click</button
>

<svg viewBox="0 0 100 100">
  <Circle bind:ref={circle} />
</svg>
