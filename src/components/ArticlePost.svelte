<script>
    export let date;
    export let title;
    export let description;
    export let url;
</script>

<section class="grid grid-cols-1 md:grid-cols-2 mb-20">
    <div
        class="flex flex-col items-start justify-center border-box row-start-2 md:row-start-1 md:col-start-1 md:px-[8%] lg:px-[23%] xl:px-[26%]"
    >
        <p class=" font-mono nt-color opacity-70 z-0 w-full">
            {date || "January 23, 2024"}
        </p>

        <h2
            class=" text-[2.3rem] lg:text-[2.8rem] xl:text-[3rem] font-bold w-full"
        >
            <a href={url} class="pm-color hover:text-[var(--nt-color)] ">
                {title || "Untitled"}
            </a>
        </h2>

        <p class="nt-color text-lg mt-4 w-full">
            {description || "No description"}
        </p>

        <a href={url} class="mt-4 pm-color">
            Read More
        </a>

        <hr class="mt-5 mb-10 w-[25%]" />
    </div>

    <div
        class="hidden md:block border border-dashed border-[var(--ft-color)] fixed h-[100vh] w-[0px] left-[50%] top-0 z-[300]"
    ></div>

    <div
        class="mb-8 flex justify-center items-center border-box row-start-1 md:row-start-1 md:col-start-2 lg:px-[10%]"
    >
        <slot name="thumbnail" />
    </div>
</section>
