<script>
  import Katex from "svelte-katex";
  import Circle from "@/components/visuals/Circle.svelte";
  import Arrow from "@/components/visuals/Arrow.svelte";

  const px = "px";

  let w;
  $: r = w * 0.08;

  const circle = {
    class: "flex justify-center items-center nt-color bg-blue-500/50 ",
  };
</script>

<div bind:clientWidth={w} class="middle my-10">
  <Circle r={r + px} {...circle}>
    <Katex>x</Katex>
  </Circle>
  <div class=" flex flex-col justify-center items-center ml-2">
    <Arrow dir="right" class=" -rotate-[30deg] origin-left " />
    <Arrow dir="right" class=" rotate-[30deg] origin-left " />
  </div>
  <div class=" flex flex-col justify-center items-center">
    <Circle r={r + px} {...circle}>
      <Katex>a(x)</Katex>
    </Circle>
    <Circle r={r + px} {...circle}>
      <Katex>b(x)</Katex>
    </Circle>
  </div>
  <div class=" flex flex-col justify-center items-center ml-2">
    <Arrow dir="right" class=" rotate-[30deg] origin-right " />
    <Arrow dir="right" class=" -rotate-[30deg] origin-right " />
  </div>
  <Circle r={r + px} {...circle}>
    <Katex>\times</Katex>
  </Circle>
  <Arrow dir="right" class="pl-2" />
  <Katex>f</Katex>
</div>
