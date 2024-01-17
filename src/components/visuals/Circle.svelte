<script>
  import Div from "@/components/visuals/Div.svelte";

  export let x = null;
  export let y = null;
  export let r = 10;
  export let fill = 'white';
  export let style = {};
</script>

<Div
  style={{
    'position': (x!==null||y!==null) ? 'absolute' : '',
    'left': x + '%',
    'top': y + '%',
    'width': r * 2 + '%',
    'height': r * 2 + '%',
    'border-radius': '100%',
    'background-color': fill,
    ...style,
  }}
  {...$$restProps}
/>
