<script>
  import signal from "@/utils/signal.js";

  import Div from "@/components/visuals/Div.svelte";
  import Rect from "@/components/visuals/Rect.svelte";
  import Circle from "@/components/visuals/Circle.svelte";

  let circle = signal({ x: 50, y: 50, r: 10, fill: "white" });
</script>

<button on:click={() => circle.toNow({ r: Math.random() * 50 })}> Move </button>

<Div let:w let:h class="relative bg-slate-500 " w={500} h={500}>
  <Rect w={50 * w} h={50 * h} x={40 * w} fill="red">
    <Circle r={$circle.r * w} class="flex justify-start items-center">
      <div class='flex items-center w-1/2'>
        <div class='h-[2px] flex-1 bg-[black]'></div>
        <p class="bg-color flex-1 px-2">{Math.floor($circle.r * 100) / 100}</p>
        <div class='h-[2px] flex-1 bg-[black]'></div>
      </div>
    </Circle>
  </Rect>
</Div>
