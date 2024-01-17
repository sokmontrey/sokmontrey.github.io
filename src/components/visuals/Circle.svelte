<script>
  import Rect from "@/components/visuals/Rect.svelte";

  /** @type {number} r */
  export let r = 100;
  /** @type {number} cx */
  export let x = null;
  /** @type {number} cy */
  export let y = null;
</script>

<Rect 
  w={r * 2}
  h={r * 2}
  x={x!==null ? x - r : null}
  y={y!==null ? y - r : null}
  style={{
    'border-radius': '100%',
  }}
  {...$$restProps}
>
  <slot w={(r * 2) / 100} h={(r * 2) / 100} />
</Rect>
