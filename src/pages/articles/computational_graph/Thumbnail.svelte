<script>
    import signal from "@/utils/signal.js";
    import { onMount } from 'svelte';

    import Div from "@/components/visuals/Div.svelte";
    import Rect from "@/components/visuals/Rect.svelte";
    import Circle from "@/components/visuals/Circle.svelte";

    let circle = signal({ x: 50, y: 50, r: 0.5, fill: "white" });
    const px = "px";
</script>

<Div let:w class="relative flex justify-center w-[100%] ">
    <Div
        style = {{
            width: $circle.r * w + px,
            height: $circle.r * w + px,
        }}
        let:w
    >
    <button class='bg-white p-4 text-black' on:click={()=> circle.toNow({ r: Math.random() * 0.5 })}>
            Hello world
        </button>
        <Circle class='bg-white' r={($circle.r * w) / 2 + px} />
    </Div>
</Div>
