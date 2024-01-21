<script>
    export let article;
</script>

<section class="flex flex-col ">
    <p class=" nt-color opacity-40 z-0 "> 
        {article.frontmatter.date || "January 23, 2024"}
    </p>
    <h2 class=" pm-color text-[2.3rem] font-bold">
        {article.frontmatter.title || "Untitled"}
    </h2>
    <div class="flex-1 w-[100%] h-[500px] pt-[80%] my-4 bg-ft-color">
        <article.thumbnail />
    </div>
    <p class=" nt-color text-lg opacity-70">
        {article.frontmatter.description || "No description"}
    </p>
</section>
