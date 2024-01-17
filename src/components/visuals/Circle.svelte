<script>
  import Div from "@/components/visuals/Div.svelte";

  export let x = null;
  export let y = null;
  export let r = 10;
  export let fill = "white";

  export let style = {};
</script>

<Div
  style={{
    position: style.position || "absolute",
    left: style.left || x + "%",
    top: style.top || y + "%",
    width: style.width || r * 2 + "%",
    height: style.height || r * 2 + "%",
    "border-radius": style["border-radius"] || "100%",
    "background-color": style["background-color"] || fill,
    ...style,
  }}
  {...$$restProps}
/>
