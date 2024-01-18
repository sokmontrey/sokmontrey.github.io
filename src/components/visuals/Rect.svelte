<script>
  //ts-check
  import Div from "@/components/visuals/Div.svelte";

  /** @type {Object} style - Style object
    * Use regular css properties name and values
    * 
    * @example
    * 'background-color': 'red',
    */
  export let style = {};

  /** @type {number} w - Width */
  export let w = 100;
  /** @type {number} h - Height */
  export let h = 100;

  /** @type {number} x - left value
    * This will set position to 'absolute' */
  export let x = null;
  /** @type {number} y - top value 
    * This will set position to 'absolute' */
  export let y = null;

  /** @type {string} fill - Fill color 
    * (will be used on background-color) */
  export let fill = "white";

  /** @type {string} unit - Unit to be used*/
  export let unit = "px";
</script>

<Div
  style={{
    ...style,
    "background-color": style["background-color"] || fill || "",
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
