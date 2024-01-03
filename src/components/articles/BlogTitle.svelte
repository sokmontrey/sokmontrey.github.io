<script>
  export let title;
  export let url;
</script>

<h2 class=' text-2xl w-[90%] pm-color '>
  <a href={url} class='no-underline flex '>
    <div class='flex flex-col'>
      <span class='text-4xl '>{title[0]}</span>
      <span class='bg-gradient-to-b from-[var(--pm-color)] to-transparent flex-1 w-[1px] mx-auto'></span>
    </div>
    <div class='pt-4 '>
      <span>{title.slice(1)}</span>
    </div>
  </a>
</h2>

<style>
  a:hover {
    background: none;
    padding: 0;
  }
</style>
