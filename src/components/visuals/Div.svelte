<script>
  export let style = {};
</script>

<div {...$$restProps}
  style={Object.entries(style).reduce((acc, [k, v]) => {
    return acc + `${k}: ${v};`;
  }, "")}
>
  <slot />
</div>
