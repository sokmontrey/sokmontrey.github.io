<span id="tooltip-text" class="inline pm-color cursor-pointer opacity-1">
  <slot name="toggler" />
</span>

<span
  id="tooltip"
  class="inline-block fixed top-[10%] min-w-[90vw] xl:min-w-[10vw] xl:max-w-[25vw] left-1/2 xl:left-[70vw] xl:top-1/2 -translate-x-1/2 xl:translate-x-0 xl:-translate-y-1/2 px-3 py-2 bg-bg-color nt-color transition-opacity duration-50 ease-in-out invisible opacity-0 duration-300 border border-dashed border-1 border-[var(--pm-color)] z-[100] shadow-[0px_0px_3rem_var(--bg-color)]"
>
  <span class="pm-color"><slot name="toggler" /></span>
  <slot />
</span>

<style>
  #tooltip-text:hover + #tooltip,
  #tooltip:hover {
    visibility: visible;
    opacity: 1;
  }

  #tooltip-text:hover {
    text-decoration: underline;
    text-decoration-color: var(--pm-color);
    text-decoration-skip-ink: none;
    text-underline-offset: 0.2em;
  }
</style>
