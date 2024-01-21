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
    export let w = null;
    /** @type {number} h - Height */
    export let h = null;

    /** @type {string} unit - Unit to be used*/
    export let unit = "px";

    function getWidth(node) {
        if (w === null) w = node.clientWidth;
        if (h === null) h = node.clientHeight;
    }
</script>

<div
    use:getWidth
    style={Object.entries({
        ...style,
        width: w + unit,
        height: h + unit,
    }).reduce((acc, [k, v]) => {
        return acc + `${k}: ${v};`;
    }, "")}
    {...$$restProps}
>
    <slot w={w / 100} h={h / 100} />
</div>
