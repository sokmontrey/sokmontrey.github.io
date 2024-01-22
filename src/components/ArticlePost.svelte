<script>
    export let date;
    export let title;
    export let description;
    export let url;
</script>

<section class="flex flex-col">
    <p class=" nt-color opacity-70 z-0">
        {date || "January 23, 2024"}
    </p>
    <h2 class=" pm-color text-[2.3rem] font-bold mb-4">
        <a href={url}>
            {title || "Untitled"}
        </a>
    </h2>
    <slot name="thumbnail" />
    <p class=" nt-color text-lg mt-4">
        {description || "No description"}
    </p>

    <hr class="mt-5 mb-10 w-[25%] " />
</section>
