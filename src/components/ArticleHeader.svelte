<script>
    export let title;
    export let description;
    export let tags;
    export let date;
</script>

<h2 class="font-serif pm-color font-bold px-0 text-[2.5rem] xl:text-[2.8rem] ">
    {title}
</h2>

<div class="flex flex-wrap my-5">
    {#each tags as tag}
        <span class="bg-ft-color px-[0.5rem] m-[0.1rem] text-sm rounded-xl"
            >#{tag}</span
        >
    {/each}
</div>

<p class="opacity-50">
    {date}
</p>

<p class="opacity-80 mt-4">
    {description}
</p>
