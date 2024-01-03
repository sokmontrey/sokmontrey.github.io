<script>
  import { onMount } from 'svelte';

  function getTheme(){
    return localStorage.getItem('theme') 
      || (window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light") 
      || "light";
  }

  function storeTheme(theme){
    localStorage.setItem('theme', theme);
  }

  function updateTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
  }

  let theme = getTheme();
  updateTheme(theme);

  function changeTheme() {
    theme = theme === "dark" ? "light" : "dark";
    updateTheme(theme);
    storeTheme(theme);
  };
</script>

<div class='fixed top-0 right-0 p-4 '>
  <button on:click={changeTheme}>
    {#if theme === "dark"}
      <i class="fa-solid fa-sun"></i>
    {:else}
      <i class="fa-solid fa-moon"></i>
    {/if}
  </button>
</div>
