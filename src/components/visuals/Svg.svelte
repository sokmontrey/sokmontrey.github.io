<script>
  // @ts-check
  export const opts = {
    viewBox:'0 0 100 100',
    ...$$props
  };

</script>

<svg {...opts} xmlns="http://www.w3.org/2000/svg">
  <slot />
</svg>
