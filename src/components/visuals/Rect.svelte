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
  export let x = null;
  /** @type {number} y */
  export let y = null;

  /** @type {string} fill */
  export let fill = "white";

  export let unit = "px";
</script>

<Div
  style={{
    ...style,
    "background-color": style["background-color"] || fill || "",
    display: style.display || "inline-block",
    position: style.position || (x !== null || y !== null ? "absolute" : ""),
    left: x ? x + unit : "",
    top: y ? y + unit : "",
  }}
  {w}
  {h}
  {...$$restProps}
>
  <slot w={w / 100} h={h / 100} />
</Div>
