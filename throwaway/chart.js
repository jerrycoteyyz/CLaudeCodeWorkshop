const MAX_TICKS = 100;
const INTERVAL_MS = 1000;

const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const priceEl = document.getElementById('current-price');
const deltaEl = document.getElementById('delta');

const prices = [100];
const times = [new Date()];

function resize() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = Math.round(rect.width * 0.4) * dpr;
  canvas.style.height = Math.round(rect.width * 0.4) + 'px';
  ctx.scale(dpr, dpr);
  draw();
}

function draw() {
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width / dpr;
  const H = canvas.height / dpr;
  const PAD = { top: 20, right: 20, bottom: 40, left: 60 };

  ctx.clearRect(0, 0, W, H);

  const minP = Math.min(...prices) - 1;
  const maxP = Math.max(...prices) + 1;
  const priceRange = maxP - minP || 2;

  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  // grid lines
  ctx.strokeStyle = '#21262d';
  ctx.lineWidth = 1;
  const gridLines = 5;
  for (let i = 0; i <= gridLines; i++) {
    const y = PAD.top + (chartH / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(PAD.left, y);
    ctx.lineTo(PAD.left + chartW, y);
    ctx.stroke();

    const label = (maxP - (priceRange / gridLines) * i).toFixed(2);
    ctx.fillStyle = '#8b949e';
    ctx.font = '11px Courier New';
    ctx.textAlign = 'right';
    ctx.fillText('$' + label, PAD.left - 8, y + 4);
  }

  if (prices.length < 2) return;

  const xStep = chartW / (MAX_TICKS - 1);

  // x-axis time labels
  ctx.fillStyle = '#8b949e';
  ctx.font = '11px Courier New';
  ctx.textAlign = 'center';
  prices.forEach((_, i) => {
    const x = PAD.left + i * xStep;
    const t = times[i];
    const label = t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (i === 0 || i === prices.length - 1 || i % 5 === 0) {
      ctx.fillText(label, x, H - PAD.bottom + 16);
    }
  });

  // price line
  const isUp = prices[prices.length - 1] >= prices[0];
  const lineColor = isUp ? '#3fb950' : '#f85149';

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.beginPath();

  prices.forEach((price, i) => {
    const x = PAD.left + i * xStep;
    const y = PAD.top + chartH - ((price - minP) / priceRange) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // fill under line
  const lastX = PAD.left + (prices.length - 1) * xStep;
  const firstX = PAD.left;
  ctx.lineTo(lastX, PAD.top + chartH);
  ctx.lineTo(firstX, PAD.top + chartH);
  ctx.closePath();
  ctx.fillStyle = isUp ? 'rgba(63,185,80,0.08)' : 'rgba(248,81,73,0.08)';
  ctx.fill();

  // dot at latest price
  const dotX = PAD.left + (prices.length - 1) * xStep;
  const dotY = PAD.top + chartH - ((prices[prices.length - 1] - minP) / priceRange) * chartH;
  ctx.beginPath();
  ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
  ctx.fillStyle = lineColor;
  ctx.fill();
}

function tick() {
  const last = prices[prices.length - 1];
  const delta = (Math.random() * 2 - 1).toFixed(2) * 1;
  const next = Math.max(0.01, +(last + delta).toFixed(2));

  if (prices.length >= MAX_TICKS) {
    prices.shift();
    times.shift();
  }
  prices.push(next);
  times.push(new Date());

  priceEl.textContent = '$' + next.toFixed(2);

  const sign = delta >= 0 ? '+' : '';
  deltaEl.textContent = sign + delta.toFixed(2);
  deltaEl.className = 'delta ' + (delta >= 0 ? 'up' : 'down');

  draw();
}

window.addEventListener('resize', resize);
resize();
setInterval(tick, INTERVAL_MS);
