<script>
  import signal from "@/utils/signal.js";

  import Div from "@/components/visuals/Div.svelte";
  import Rect from "@/components/visuals/Rect.svelte";

  let circle = signal({ x: 50, y: 50, r: 5, fill: "white" });
</script>

<button on:click={() => circle.toNow({ r: Math.random() * 50 })}> Move </button>

<Div let:w let:h class="relative bg-slate-500 " w={500} h={500}>
  <Rect w={50 * w} h={50 * h} x={20 * w} fill="red">
    <Rect></Rect>
  </Rect>
</Div>
