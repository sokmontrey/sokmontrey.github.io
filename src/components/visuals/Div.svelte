<script>
    //ts-check

    /** @type {Object} style - Style object
     * Use regular css properties name and values
     *
     * @example
     * 'background-color': 'red',
     */
    export let style = {};

    /** @type {number} w - Width */
    let w = null;
    /** @type {number} h - Height */
    let h = null;
</script>

<div 
    bind:clientWidth={w}
    bind:clientHeight={h}
    style={Object.entries(style).reduce(
        (acc, [k, v]) => `${acc}${k}:${v};`,
        "",
    )}
    {...$$restProps}
>
    <slot w={w} h={h}></slot>
</div>
