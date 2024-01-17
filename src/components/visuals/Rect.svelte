<script>
  //ts-check
  import Div from "@/components/visuals/Div.svelte";

  /** @type {Object} style */
  export let style = {};

  /** @type {number} w */
  export let w = 100;
  /** @type {number} h */
  export let h = 100;

  /** @type {number} x */
  /** @type {number} y */
  export let x = null;
  export let y = null;

  /** @type {string} fill */
  export let fill = "white";
</script>

<Div
  style={{
    ...style,
    "background-color": style["background-color"] || fill || "",
    display: style.display || "inline-block",
    position: style.position || (x !== null || y !== null ? "absolute" : ""),
    left: x ? x + "px" : "",
    top: y ? y + "px" : "",
  }}
  {w}
  {h}
  {...$$restProps}
>
  <slot w={w / 100} h={h / 100} />
</Div>
