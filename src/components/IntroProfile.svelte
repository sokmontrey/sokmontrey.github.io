<!-- <img src='/mypicture.jpg' alt='My Picture' width='100' height='100' /> -->

<script>
  import { onMount } from 'svelte';
  const id = 'profile-canvas';

  onMount(()=>{
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');

    const w = canvas.width;
    const h = canvas.height;

    // load image 
    const img = new Image();
    img.src = '/mypicture.jpg';
    img.onload = ()=>{
      console.log('image loaded');
      ctx.drawImage(img, 0, 0, w, h);
    };
  });
</script>

<canvas id={id} width='450px' height='500px' ></canvas>

