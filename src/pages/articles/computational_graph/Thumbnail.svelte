<script>
  import Circle from '@/components/visuals/Circle.svelte';
  import Svg from '@/components/visuals/Svg.svelte';

  class Vector {
    constructor(x,y) {
      this.x = x;
      this.y = y;
    }

    add(v2) {
      return new Vector(this.x+v2.x, this.y+v2.y);
    }

    left(padding) {
      return new Vector(this.x - padding, this.y);
    }

    right(padding) {
      return new Vector(this.x + padding, this.y);
    }

    up(padding) {
      return new Vector(this.x, this.y - padding);
    }

    down(padding) {
      return new Vector(this.x, this.y + padding);
    }
  }

  const c = [{
    pos : new Vector(0,0),
    r : 10,
    render: Circle,
  }];

</script>

<div class='w-full' >

  <button on:click={()=>c[0].pos = c[0].pos.right(10)}>Click</button>
  <button on:click={()=>c[0].r = Math.random() * 50}>Click</button>

  <Svg viewBox='0 0 100 100'>
    <svelte:component this={c[0].render} bind:ref={c[0]} />
  </Svg>
</div>

