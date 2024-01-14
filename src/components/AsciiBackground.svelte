<script>
  import { onMount } from 'svelte'; 
  let canvas_id = 'welcome-canvas';

  function getRootColor(color_name) {
    return getComputedStyle(document.documentElement).getPropertyValue(color_name);
  }

  let nt_color = getRootColor('--nt-color');
  let pm_color = getRootColor('--pm-color');
  let bg_color = getRootColor('--bg-color');

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        nt_color = getRootColor('--nt-color');
        pm_color = getRootColor('--pm-color');
        bg_color = getRootColor('--bg-color');
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  onMount(() => {
    const canvas = document.getElementById(canvas_id);
    const ctx = canvas.getContext('2d');

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resizeCanvas = ()=>{
      canvas.width = w;
      canvas.height = h;
    };
    resizeCanvas();

    window.addEventListener('resize', () => {
      w = window.innerWidth;
      h = window.innerHeight;
      resizeCanvas();
    });

    ctx.font = '1rem JetBrains Mono';
    const textMetrics = ctx.measureText('a');
    const text_w = textMetrics.width + 17;
    const text_h = textMetrics.actualBoundingBoxAscent 
      + textMetrics.actualBoundingBoxDescent 
      + 15;

    const mouse_pos = [0,0];
    window.addEventListener('mousemove', (e)=>{
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse_pos[0] = x - x % text_w;
      mouse_pos[1] = y - y % text_h;
    });

    const getChars = (chars) => {
      if (chars.length === 1) return chars;
      return chars[Math.floor(Math.random() * chars.length)];
    }

    function drawCircle(x=0, y=0, radius=10, color='#fff', chars='.'){
      radius = Math.floor(radius*text_w);
      const TWO_PI = Math.PI * 2;
      const INCREMENT = 0.1;
      for (let i=0; i<TWO_PI; i+=INCREMENT) {
        const x_offset = Math.floor(radius * Math.cos(i) / text_w) * text_w;
        const y_offset = Math.floor(radius * Math.sin(i) / text_h) * text_h;
        const char = getChars(chars);
        ctx.fillStyle = color;
        ctx.fillText(char, x+x_offset, y+y_offset);
      }
    }

    const loop = ()=>{
      ctx.fillStyle = bg_color + '77';
      ctx.fillRect(0,0,w,h);
      for (let i=1; i<10; i++) {
        const hex_opacity = Math.floor((9-i) * 5).toString(16).padStart(2, '0');
        drawCircle(mouse_pos[0], mouse_pos[1], i, nt_color + hex_opacity);
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    window.addEventListener('click', ()=>{
      requestAnimationFrame(()=>{
        const x = mouse_pos[0];
        const y = mouse_pos[1];
        for (let i=0; i<20; i++) {
          setTimeout(()=>{
            drawCircle(x, y, i, 
              nt_color, 
              'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            );
          }, i * 50);
        }
      });
    });
  });
</script>

<canvas width="100vw" height="100vh" class='absolute top-0 left-0 z-0 ' id={canvas_id}></canvas>
