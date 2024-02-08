<span id="tooltip-text" {...$$restProps}>
  <slot name="toggler" />
</span>

<div
  id="tooltip"
  class="absolute z-100 inline-block px-3 py-2 bg-bg-color nt-color transition-opacity duration-300 rounded-lg opacity-0 border border-[var(--ft-color)]"
>
  <slot />
</div>

<style>
  #tooltip-text {
    color: var(--sd-color);
    cursor: pointer;
    opacity: 1;
    font-weight: bold;
  }

  #tooltip {
    visibility: hidden;
    box-shadow: 0px 0rem 2rem var(--bg-color);
  }

  #tooltip-text:hover + #tooltip,
  #tooltip:hover {
    visibility: visible;
    opacity: 1;
  }
</style>
