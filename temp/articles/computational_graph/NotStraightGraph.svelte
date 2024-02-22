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

<div class="w-full h-full flex justify-center items-center my-10">
  <Circle {...circle}>
    <Katex>x</Katex>
  </Circle>

  <Arrow {...arrow} />

  <Circle {...circle}>
    <Katex>\sin</Katex>
  </Circle>

  <div>
    <Arrow
      {...arrow}
      container_class=" pl-2 opacity-50 origin-left -rotate-[30deg]"
    />
    <Arrow
      {...arrow}
      container_class=" pl-2 opacity-50 origin-left rotate-[30deg]"
    />
  </div>

  <div>
    <Circle {...circle}>
      <Katex>x^2</Katex>
    </Circle>
    <div class="h-5"></div>
    <Circle {...circle}>
      <Katex>\times 3</Katex>
    </Circle>
  </div>

  <div>
    <Arrow
      {...arrow}
      container_class=" pl-2 opacity-50 origin-right rotate-[30deg]"
    />
    <Arrow
      {...arrow}
      container_class=" pl-2 opacity-50 origin-right -rotate-[30deg]"
    />
  </div>

  <Circle {...circle}>
    <Katex>+</Katex>
  </Circle>

  <Arrow {...arrow} />

  <Circle {...circle}>
    <Katex>g</Katex>
  </Circle>
</div>
