// One fixed canvas shared by every revealing element. An element is drawn into
// an off-screen canvas (its text, images, backgrounds and borders, each in its
// own colour), that raster is sampled into dots, and the dots fly in from
// around the element to rebuild it. Then the real element fades in on top.

type Dot = { tx: number; ty: number; sx: number; sy: number; delay: number; color: string; alpha: number; size: number };
type Reveal = { el: HTMLElement; dots: Dot[]; start: number; onShow: () => void; shown: boolean };

const GATHER_MS = 750;
const FADE_MS = 450;
const MAX_DOTS = 6500;
const TEXT_FALLBACK = "#e8ecf3";

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let raf = 0;
const active = new Set<Reveal>();

function ensureCanvas() {
  if (canvas) return;
  canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:30";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  const size = () => {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  window.addEventListener("resize", size);
}

function parseColor(c: string): [number, number, number, number] | null {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
  return [parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1];
}

function roundRect(o: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  o.beginPath();
  o.roundRect(x, y, w, h, Math.min(r, w / 2, h / 2));
}

/** Paint `el` (backgrounds, borders, images, text) into a canvas the size of its box. */
function rasterize(el: HTMLElement) {
  const box = el.getBoundingClientRect();
  const W = Math.max(1, Math.ceil(box.width)), H = Math.max(1, Math.ceil(box.height));
  const off = document.createElement("canvas");
  off.width = W; off.height = H;
  const o = off.getContext("2d", { willReadFrequently: true })!;

  const elements = [el, ...Array.from(el.querySelectorAll<HTMLElement>("*"))];
  for (const node of elements) {
    const cs = getComputedStyle(node);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const r = node.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const x = r.left - box.left, y = r.top - box.top;
    const radius = parseFloat(cs.borderTopLeftRadius) || 0;

    const bg = parseColor(cs.backgroundColor);
    if (bg && bg[3] > 0.15) {
      o.fillStyle = cs.backgroundColor;
      roundRect(o, x, y, r.width, r.height, radius);
      o.fill();
    }
    const bw = parseFloat(cs.borderTopWidth) || 0;
    const bc = parseColor(cs.borderTopColor);
    if (bw > 0 && bc && bc[3] > 0.02 && cs.borderTopStyle !== "none") {
      // Faint borders are drawn brighter so the outline still reads in dots.
      o.strokeStyle = `rgba(${bc[0]},${bc[1]},${bc[2]},${Math.max(bc[3], 0.6)})`;
      o.lineWidth = Math.max(1.5, bw);
      const sides = ["Top", "Right", "Bottom", "Left"].map((s) => parseFloat(cs.getPropertyValue(`border-${s.toLowerCase()}-width`)) || 0);
      if (sides.every((s) => s > 0)) { roundRect(o, x, y, r.width, r.height, radius); o.stroke(); }
      else {
        o.beginPath();
        if (sides[0]) { o.moveTo(x, y); o.lineTo(x + r.width, y); }
        if (sides[2]) { o.moveTo(x, y + r.height); o.lineTo(x + r.width, y + r.height); }
        if (sides[3]) { o.moveTo(x, y); o.lineTo(x, y + r.height); }
        if (sides[1]) { o.moveTo(x + r.width, y); o.lineTo(x + r.width, y + r.height); }
        o.stroke();
      }
    }
    if (node instanceof HTMLImageElement && node.complete && node.naturalWidth) {
      // Approximate object-fit: cover.
      const ir = node.naturalWidth / node.naturalHeight, br = r.width / r.height;
      let sw = node.naturalWidth, sh = node.naturalHeight, sx = 0, sy = 0;
      if (cs.objectFit === "cover") {
        if (ir > br) { sw = sh * br; sx = (node.naturalWidth - sw) / 2; }
        else { sh = sw / br; sy = cs.objectPosition.startsWith("50% 0") ? 0 : (node.naturalHeight - sh) / 2; }
      }
      o.save();
      roundRect(o, x, y, r.width, r.height, radius);
      o.clip();
      o.drawImage(node, sx, sy, sw, sh, x, y, r.width, r.height);
      o.restore();
    }
  }

  // Text, word by word, at its real position and in its real font.
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const parent = n.parentElement;
    if (!parent) continue;
    const cs = getComputedStyle(parent);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    const color = parseColor(cs.color);
    o.fillStyle = color && color[3] > 0.05 ? cs.color : TEXT_FALLBACK;
    o.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    (o as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
    o.textBaseline = "middle";
    const text = n.textContent || "";
    for (const m of text.matchAll(/\S+/g)) {
      range.setStart(n, m.index!);
      range.setEnd(n, m.index! + m[0].length);
      const rr = range.getClientRects()[0];
      if (!rr) continue;
      const word = cs.textTransform === "uppercase" ? m[0].toUpperCase() : m[0];
      o.fillText(word, rr.left - box.left, rr.top - box.top + rr.height / 2);
    }
  }
  return { o, W, H };
}

function sample(o: CanvasRenderingContext2D, W: number, H: number) {
  const data = o.getImageData(0, 0, W, H).data;
  let filled = 0;
  for (let i = 3; i < data.length; i += 16) if (data[i] > 40) filled++;
  const estimate = filled * 4;
  const gap = Math.max(3, Math.ceil(Math.sqrt(estimate / MAX_DOTS)));
  const pts: { x: number; y: number; color: string; alpha: number }[] = [];
  for (let y = 0; y < H; y += gap) {
    for (let x = 0; x < W; x += gap) {
      const i = (y * W + x) * 4;
      const a = data[i + 3];
      if (a <= 40) continue;
      pts.push({ x, y, color: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`, alpha: Math.max(0.35, a / 255) });
    }
  }
  return { pts, gap };
}

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

function frame(now: number) {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const vh = window.innerHeight;

  for (const r of active) {
    const t = now - r.start;
    if (!r.shown && t >= GATHER_MS * 0.8) { r.shown = true; r.onShow(); }
    if (t >= GATHER_MS + FADE_MS) { active.delete(r); continue; }
    const rect = r.el.getBoundingClientRect();
    if (rect.bottom < -60 || rect.top > vh + 60) continue;
    const fade = t > GATHER_MS ? 1 - (t - GATHER_MS) / FADE_MS : 1;
    for (const d of r.dots) {
      const p = ease(Math.min(1, Math.max(0, (t / GATHER_MS - d.delay) / (1 - d.delay))));
      ctx.globalAlpha = Math.min(p * 1.5, 1) * fade * d.alpha;
      ctx.fillStyle = d.color;
      ctx.fillRect(rect.left + d.sx + (d.tx - d.sx) * p, rect.top + d.sy + (d.ty - d.sy) * p, d.size, d.size);
    }
  }
  ctx.globalAlpha = 1;
  raf = active.size ? requestAnimationFrame(frame) : 0;
}

/** Rebuild `el` from particles; `onShow` fires when the real element should appear. */
export function playReveal(el: HTMLElement, onShow: () => void) {
  ensureCanvas();
  const { o, W, H } = rasterize(el);
  const { pts, gap } = sample(o, W, H);
  if (!pts.length) { onShow(); return; }
  const spread = Math.min(260, 60 + Math.max(W, H) * 0.25);
  const dots = pts.map((p) => {
    const a = Math.random() * Math.PI * 2;
    const dist = spread * (0.4 + Math.random() * 0.6);
    return {
      tx: p.x, ty: p.y,
      sx: p.x + Math.cos(a) * dist, sy: p.y + Math.sin(a) * dist,
      delay: Math.random() * 0.35,
      color: p.color, alpha: p.alpha,
      size: Math.max(1.4, gap * 0.5),
    };
  });
  active.add({ el, dots, start: performance.now(), onShow, shown: false });
  if (!raf) raf = requestAnimationFrame(frame);
}
