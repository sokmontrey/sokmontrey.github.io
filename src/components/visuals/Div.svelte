<script>
  //ts-check
  /** @type {Object} style */
  export let style = {};

  /** @type {number} w */
  export let w = null;
  /** @type {number} h */
  export let h = null;
</script>

<div
  style={Object.entries({
    ...style,
    width: w + "px",
    height: h + "px",
  }).reduce((acc, [k, v]) => {
    return acc + `${k}: ${v};`;
  }, "")}
  {...$$restProps}
>
  <slot w={w / 100} h={h / 100} />
</div>
