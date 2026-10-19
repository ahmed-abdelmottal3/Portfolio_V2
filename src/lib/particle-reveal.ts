// One fixed canvas, shared by every revealing section. Each reveal flies dots
// in from around an element to trace its border (or a single line), then the
// element's content fades in and the dots fade out.

export type RevealShape = "outline" | "line-top" | "line-middle";

type Dot = { tx: number; ty: number; sx: number; sy: number; delay: number };
type Reveal = { el: HTMLElement; dots: Dot[]; start: number; onShow: () => void; shown: boolean };

const GATHER_MS = 650;
const FADE_MS = 450;
const SPACING = 7;

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

function targetsFor(el: HTMLElement, shape: RevealShape) {
  const w = el.offsetWidth, h = el.offsetHeight;
  const pts: { x: number; y: number }[] = [];
  if (shape !== "outline") {
    const y = shape === "line-top" ? 0 : h / 2;
    for (let x = 0; x <= w; x += SPACING) pts.push({ x, y });
    return pts;
  }
  // Rounded rectangle perimeter.
  const r = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2);
  const straightW = w - 2 * r, straightH = h - 2 * r;
  for (let x = 0; x <= straightW; x += SPACING) { pts.push({ x: r + x, y: 0 }); pts.push({ x: r + x, y: h }); }
  for (let y = 0; y <= straightH; y += SPACING) { pts.push({ x: 0, y: r + y }); pts.push({ x: w, y: r + y }); }
  const arcSteps = Math.max(2, Math.round((Math.PI * r) / 2 / SPACING));
  const corners = [
    { cx: r, cy: r, a0: Math.PI },
    { cx: w - r, cy: r, a0: Math.PI * 1.5 },
    { cx: w - r, cy: h - r, a0: 0 },
    { cx: r, cy: h - r, a0: Math.PI / 2 },
  ];
  for (const c of corners) {
    for (let i = 1; i < arcSteps; i++) {
      const a = c.a0 + (i / arcSteps) * (Math.PI / 2);
      pts.push({ x: c.cx + Math.cos(a) * r, y: c.cy + Math.sin(a) * r });
    }
  }
  return pts;
}

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

function frame(now: number) {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#e8ecf3";
  const vh = window.innerHeight;

  for (const r of active) {
    const t = now - r.start;
    if (!r.shown && t >= GATHER_MS * 0.7) { r.shown = true; r.onShow(); }
    if (t >= GATHER_MS + FADE_MS) { active.delete(r); continue; }

    const rect = r.el.getBoundingClientRect();
    if (rect.bottom < -50 || rect.top > vh + 50) continue;
    const fade = t > GATHER_MS ? 1 - (t - GATHER_MS) / FADE_MS : 1;
    for (const d of r.dots) {
      const p = ease(Math.min(1, Math.max(0, (t / GATHER_MS - d.delay) / (1 - d.delay))));
      ctx.globalAlpha = Math.min(p * 1.4, 1) * fade * 0.85;
      ctx.fillRect(rect.left + d.sx + (d.tx - d.sx) * p - 0.8, rect.top + d.sy + (d.ty - d.sy) * p - 0.8, 1.6, 1.6);
    }
  }
  ctx.globalAlpha = 1;
  raf = active.size ? requestAnimationFrame(frame) : 0;
}

/** Play the particle reveal for `el`; `onShow` fires when the content should appear. */
export function playReveal(el: HTMLElement, shape: RevealShape, onShow: () => void) {
  ensureCanvas();
  const dots = targetsFor(el, shape).map((p) => {
    const a = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 180;
    return { tx: p.x, ty: p.y, sx: p.x + Math.cos(a) * dist, sy: p.y + Math.sin(a) * dist, delay: Math.random() * 0.35 };
  });
  active.add({ el, dots, start: performance.now(), onShow, shown: false });
  if (!raf) raf = requestAnimationFrame(frame);
}
