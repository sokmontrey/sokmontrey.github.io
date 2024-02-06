<script>
  import Circle from "@/components/visuals/Circle.svelte";
  import Arrow from "@/components/visuals/Arrow.svelte";
  import Katex from "svelte-katex";

  const px = "px";

  let w;
  $: r = w * 0.08;

  const circle_class = "flex justify-center items-center nt-color bg-blue-500/50 ";
</script>

<div
  bind:clientWidth={w}
  class="w-full h-full flex justify-center items-center my-10"
>
  <Circle
    r={r + px}
    fill=""
    class={circle_class}
  >
    <Katex>x</Katex>
  </Circle>
  <Arrow dir="right" class="pl-3" />
  <Circle
    r={r + px}
    fill=""
    class={circle_class}
  >
    <Katex>\times 5</Katex>
  </Circle>
  <Arrow dir="right" class="pl-3" />
  <Circle
    r={r + px}
    fill=""
    class={circle_class}
  >
    <Katex>+ 3</Katex>
  </Circle>
  <Arrow dir="right" class="pl-3" />
  <Circle
    r={r + px}
    fill=""
    class={circle_class}
  >
    <Katex>e^x</Katex>
  </Circle>
  <Arrow dir="right" class="pl-3" />
  <Katex>f</Katex>
</div>
