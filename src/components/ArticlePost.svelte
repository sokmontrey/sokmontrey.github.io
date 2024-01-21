<script >
    export let date;
    export let title;
    export let description;
</script>

<section class="flex flex-col ">
    <p class=" nt-color opacity-40 z-0 "> 
        {date || "January 23, 2024"}
    </p>
    <h2 class=" pm-color text-[2.3rem] font-bold">
        {title || "Untitled"}
    </h2>
    <slot name="thumbnail"></slot>
    <p class=" nt-color text-lg opacity-70">
        {description || "No description"}
    </p>
</section>
