<script>
  import signal from "@/utils/signal";
  import Katex from "svelte-katex";
  import Arrow from "@/components/visuals/Arrow.svelte";

  const x = signal(0);
  $: y = $x ** 2;

  const arrow = {
    container_class: "opacity-50 px-3 pt-4",
    body_class: "bg-nt-color",
    length: "30px",
    dir: "down",
  };

  const button = {
    class:
      "p-4 bg-bg-color border border-dashed border-[3px] border-gray-500 hover:border-[var(--pm-color)] font-mono flex",
  };
</script>

<div class="flex justify-center items-center my-5 flex-col">
  <button on:click={() => ($x = Math.random() * 200 - 100)} {...button}>
    {$x.toFixed(2)}
  </button>

  <Arrow {...arrow} />

  <div class="p-4 bg-bg-color border border-[3px] border-gray-500 text-center">
    <Katex>f({$x.toFixed(2)}) = {$x.toFixed(2)}^2</Katex>
  </div>

  <Arrow {...arrow} />

  <div {...button}>
    {y.toFixed(2)}
  </div>
</div>
