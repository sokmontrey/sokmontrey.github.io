<script>
    import signal from "@/utils/signal.js";

    import Div from "@/components/visuals/Div.svelte";
    import Rect from "@/components/visuals/Rect.svelte";
    import Circle from "@/components/visuals/Circle.svelte";

    let circle = signal({ x: 50, y: 50, r: 0.5, fill: "white" });
    const px = "px";
</script>

<Div let:w class="relative bg-slate-500 w-[100%] ">
    <button on:click={() => circle.toNow({ r: Math.random() })}>
        Click {$circle.r * w}
    </button>
    <Div
        class="bg-red-500"
        style = {{
            width: $circle.r * w + px,
            height: $circle.r * w + px,
        }}
        let:w
    >
        <Rect class='bg-blue-500'>
            Hello world
        </Rect>
        <Circle class='bg-blue-500' r={($circle.r * w) / 2 + px} />
    </Div>
</Div>
