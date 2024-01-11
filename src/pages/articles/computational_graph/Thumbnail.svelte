<script>
  // @ts-check
  import Svg from '@/components/visuals/Svg.svelte';
  import Circle from '@/components/visuals/Circle.svelte';

  class Vector{
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
  }
</script>

<div class='w-full' >
  <Svg class='w-full ' >
    <Circle opts={{
      cx: 50,
      cy: 50,
      r: 40,
    }} />
  </Svg>
</div>

