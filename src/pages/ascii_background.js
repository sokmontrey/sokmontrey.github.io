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

const chars = 'abcdefghijklmnopq!@#$%^&*()_+-=[]{};:,./<>?|`~';
function getChar(x, y) {
  if (x < 0 || x > w || y < 0 || y > h) return '';
  return chars[x/text_w * y/text_h % chars.length];
}

function drawCircle(x=0, y=0, radius=10, color='#fff'){
  for (let _y=0; _y<radius*2+1; _y++) {
    for (let _x=0; _x<radius*2+1; _x++) {
      const d = Math.sqrt((_x-radius)**2 + (_y-radius)**2);
      if (d < radius - 2 || d > radius) continue;
      const new_x = x + (_x-radius) * text_w;
      const new_y = y + (_y-radius+1) * text_h;
      const text = getChar(new_x, new_y);
      ctx.fillStyle = color;
      ctx.fillText(text, new_x, new_y);
    }
  }
}

const mouse_pos = [0,0];
let mouse_pressed = false;

window.addEventListener('mousedown', (e) => {
  mouse_pressed = true;
  const x = mouse_pos[0];
  const y = mouse_pos[1];

  requestAnimationFrame(() => {
    ctx.clearRect(0, 0, w, h);
    for (let i=0; i < Math.floor(w * 2/text_w); i++) {
      setTimeout(() => {
        drawCircle(x, y, i, `rgba(255, 255, 255, 0.8)`);
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

canvas.addEventListener('mousemove', (e) => {
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
    for (let i=1; i<10; i++) drawCircle(mouse_pos[0], mouse_pos[1], i, `rgba(255, 255, 255, ${(9-i) * 0.5/10})`);
  });
});
