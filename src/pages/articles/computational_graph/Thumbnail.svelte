<script>
  import signal from "@/utils/signal.js";

  let circle = signal({ x: 0, y: 0, r: 10 });
  let s = signal(10);
</script>

<button
  on:click={() => {
    s.toNow($s + 10);
  }}>Click</button
>

<svg viewBox="0 0 100 100">
  <circle cx={$circle.x} cy={$circle.y} r={$s} />
</svg>
