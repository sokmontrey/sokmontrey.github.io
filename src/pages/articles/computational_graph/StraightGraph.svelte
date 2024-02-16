<script>
  import Circle from "@/components/visuals/Circle.svelte";
  import Arrow from "@/components/visuals/Arrow.svelte";
  import Katex from "svelte-katex";

  const circle = {
    class: "middle nt-color bg-blue-500/50 w-16 ",
  };

  const arrow = {
    container_class: "opacity-50 pl-2 ",
    body_class: "bg-nt-color",
    length: "30px",
    dir: "right",
  };
</script>

<div
  class="w-full h-full flex justify-center items-center my-10"
>
  <Circle {...circle} > 
    <Katex>x</Katex>
  </Circle>

  <Arrow {...arrow} />

  <Circle {...circle} > 
    <Katex>\times 5</Katex>
  </Circle>

  <Arrow {...arrow} />

  <Circle {...circle} > 
    <Katex>+ 3</Katex>
  </Circle>

  <Arrow {...arrow} />

  <Circle {...circle} > 
    <Katex>\exp</Katex>
  </Circle>

  <Arrow {...arrow} />

  <Circle {...circle} > 
    <Katex>f</Katex>
  </Circle>
</div>
