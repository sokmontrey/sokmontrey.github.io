<canvas width="100vw" height="100vh" class='absolute top-0 left-0 transition-opacity duration-500 z-0 ' id='welcome-canvas'></canvas>

<script>
  import { onMount } from 'svelte'; 

  function getRootColor(color_name) {
    return getComputedStyle(document.documentElement).getPropertyValue(color_name);
  }

  onMount(() => {
    const canvas = document.getElementById('welcome-canvas');
    const ctx = canvas.getContext('2d');

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    window.addEventListener('resize', () => {
      canvas.width = w;
      canvas.height = h;
    });

    // create a mono text with 1rem and get its metrics
    ctx.font = '1rem JetBrains Mono';
    const textMetrics = ctx.measureText('a');
    const text_w = textMetrics.width + 17;
    const text_h = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent + 15;

    let word_x = Math.floor(Math.random() * (0.5 * w / text_w + 10) );
    let word_y = Math.floor(Math.random() * (0.5 * h / text_h + 10) );
    const word = 'HELLO WORLD';

    const random_chars = 'abcdefghijklmnopq!@#$%^&*()_+-=[]{};:,./<>?|`~';
    const chars = '.';
    function getChar(x, y) {
      if (x < 0 || x > w || y < 0 || y > h) return '';

      x = Math.floor(x/text_w);
      y = Math.floor(y/text_h);

      return chars[x * y % chars.length];
    }

    function getRandomChar(x, y) {
      if (x < 0 || x > w || y < 0 || y > h) return '';

      x = Math.floor(x/text_w);
      y = Math.floor(y/text_h);

      if (x >= word_x 
        && x < (word_x + word.length) 
        && y === word_y) {
        ctx.fillStyle = getRootColor('--pm-color');
        return word[x - word_x];
      }
      return random_chars[x * y % random_chars.length];
    }

    function drawCircle(x=0, y=0, radius=10, color='#fff', is_random=false){
      for (let _y=0; _y<radius*2+1; _y++) {
        for (let _x=0; _x<radius*2+1; _x++) {
          const d = Math.sqrt((_x-radius)**2 + (_y-radius)**2);
          if (d < radius - 2 || d > radius) continue;
          const new_x = x + (_x-radius) * text_w;
          const new_y = y + (_y-radius+1) * text_h;
          ctx.fillStyle = color;
          const text = is_random 
            ? getRandomChar(new_x, new_y) 
            : getChar(new_x, new_y);
          ctx.fillText(text, new_x, new_y);
        }
      }
    }

    const mouse_pos = [0,0];
    let mouse_pressed = false;

    window.addEventListener('mousedown', () => {
      word_x = Math.floor(Math.random() * (0.5 * w / text_w + 10) );
      word_y = Math.floor(Math.random() * (0.5 * h / text_h + 10) );
      let nt_color = getRootColor('--nt-color');
      mouse_pressed = true;
      const x = mouse_pos[0];
      const y = mouse_pos[1];

      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, w, h);
        for (let i=0; i < Math.floor(w * 2/text_w); i++) {
          setTimeout(() => {
            drawCircle(x, y, i, nt_color + '88', true);
          }, i * 10);
        }
        setTimeout(() => {
          canvas.style.opacity = '0';
        }, Math.floor(w * 2/text_w) / 2 * 10);

        setTimeout(() => {
          ctx.clearRect(0, 0, w, h);
          canvas.style.opacity = '1';
          mouse_pressed = false;
        }, Math.floor(w * 2/text_w) / 2 * 10 + 500);
      });
    });

    window.addEventListener('mousemove', (e) => {
      let nt_color = getRootColor('--nt-color');
      const rect = canvas.getBoundingClientRect();

      let x = e.clientX - rect.left;
      x -= x % text_w;
      let y = e.clientY - rect.top;
      y -= y % text_h;

      mouse_pos[0] = x;
      mouse_pos[1] = y;

      if (mouse_pressed) return;

      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, w, h);
        for (let i=1; i<10; i++) {
          const hex_opacity = Math.floor((9-i) * 0.5/10 * 255).toString(16).padStart(2, '0');
          drawCircle(mouse_pos[0], mouse_pos[1], i, nt_color + hex_opacity);
        }
      });
    });
  });
</script>
