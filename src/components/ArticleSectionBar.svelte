<script>
    import { onMount } from "svelte";

    const threshold = 0.6;
    let sections_el = [];
    let sections = [];
    let active_index = 0;

    onMount(() => {
        sections_el = Array.from(document.querySelectorAll("h1")).map(
            (el, i) => {
                el.id = `section-${i}`;
                return el;
            },
        );
        sections = Array.from(sections_el).map((el) => el.innerText);

        function getActiveSectionIndex() {
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = sections_el[i];
                const rect = el.getBoundingClientRect();
                if (rect.y / window.innerHeight < threshold) {
                    if (active_index !== i) active_index = i;
                    break;
                }
            }
        }

        window.addEventListener("scroll", () => getActiveSectionIndex());
    });
</script>

<aside
    class="hidden lg:flex flex-col justify-end fixed bottom-8 left-8 h-[100vh] font-mono"
>
    <ul class="">
        {#each sections as section, i}
            <li
                class={`text-sm opacity-${
                    i === active_index ? "100" : "50"
                } hover:opacity-100 transition-opacity`}
            >
                <button
                    class="cursor-pointer"
                    on:click={() =>
                        sections_el[i].scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        })}
                >
                    {section}
                </button>
            </li>
        {/each}
    </ul>
</aside>
