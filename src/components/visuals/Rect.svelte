<script>
    //ts-check
    import Div from "@/components/visuals/Div.svelte";

    /** @type {Object} style - Style object
     * Use regular css properties name and values
     *
     * @example
     * 'background-color': 'red',
     */
    export let style = {};
</script>

<Div
    style={{
        ...style,
        padding: style["padding"] || "1rem",
        display: style["display"] || "inline-block",
    }}
    let:w
    let:h
    {...$$restProps}
>
    <slot {w} {h} />
</Div>
