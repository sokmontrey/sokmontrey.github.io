<script>
  import signal from "@/utils/signal.js";
  import Circle from "@/components/visuals/Circle.svelte";
  import Div from "@/components/visuals/Div.svelte";

  let circle = signal({ x: 5, y: 0, r: 5, fill: "red" });
</script>

<button
  on:click={() =>
    circle.toNow(({ r, x }) => ({ r: r + 1, x: x + 5, fill: "blue" }))}
>
  Move
</button>

<Div class="w-[500px] h-[500px] relative ">
  <Circle
    x={$circle.x}
    y={$circle.y}
    r={$circle.r}
    fill={$circle.fill}
  />
</Div>

<!-- <svg viewBox="0 0 100 100"> -->
<!--   <circle {...$circle} /> -->
<!--   <circle {...$circle2} /> -->
<!-- </svg> -->
