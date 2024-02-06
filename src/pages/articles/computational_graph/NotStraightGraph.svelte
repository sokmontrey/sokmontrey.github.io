<script>
  import Katex from "svelte-katex";
  import Circle from "@/components/visuals/Circle.svelte";
  import Arrow from "@/components/visuals/Arrow.svelte";

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
  <Arrow dir="right" class="pl-2 " />
  <Circle
    r={r + px}
    fill=""
    class="flex justify-center items-center nt-color bg-orange-500/50 "
  >
    <Katex>sin</Katex>
  </Circle>
  <div class=" flex flex-col justify-center items-center ml-2">
    <Arrow dir="right" class=" -rotate-[30deg] origin-left " />
    <Arrow dir="right" class=" rotate-[30deg] origin-left " />
  </div>
  <div class=" flex flex-col justify-center items-center">
    <Circle
      r={r + px}
      fill=""
      class={circle_class}
    >
      <Katex>x^2</Katex>
    </Circle>
    <Circle
      r={r + px}
      fill=""
      class={circle_class + " mt-5 "}
    >
      <Katex>\times 3</Katex>
    </Circle>
  </div>
  <div class=" flex flex-col justify-center items-center ml-2">
    <Arrow dir="right" class=" rotate-[30deg] origin-right " />
    <Arrow dir="right" class=" -rotate-[30deg] origin-right " />
  </div>
  <Circle
    r={r + px}
    fill=""
    class={circle_class}
  >
    <Katex>+</Katex>
  </Circle>
  <Arrow dir="right" class="pl-2" />
  <Katex> g </Katex>
</div>
