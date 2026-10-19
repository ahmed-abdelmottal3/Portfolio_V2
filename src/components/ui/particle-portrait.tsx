"use client";
import { useEffect, useRef } from "react";

type Particle = {
  tx: number; ty: number;
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number; delay: number;
};

type Props = {
  src?: string;
  className?: string;
  /** Seconds before the dots start flying into place. */
  delay?: number;
  /** Grid columns sampled from the photo; more columns = finer detail. */
  columns?: number;
  /** Skip the fly-in and draw the portrait already assembled. */
  instant?: boolean;
};

// Draws a photo as a field of dots that fly into place and drift away from
// the cursor. The canvas fills its parent, so size it with the wrapper.
export default function ParticlePortrait({
  src = "/me.jpg",
  className = "",
  delay = 0.3,
  columns = 140,
  instant = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !box || !ctx) return;

    let W = 0, H = 0, raf = 0, start = 0;
    let particles: Particle[] = [];
    let img: HTMLImageElement | null = null;
    const mouse = { x: -9999, y: -9999 };
    const still = instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      if (!img) return;
      const rect = box.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = W < 420 ? Math.min(columns, 90) : columns;
      const rows = Math.round((cols * img.height) / img.width);
      const off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      const o = off.getContext("2d");
      if (!o) return;
      o.drawImage(img, 0, 0, cols, rows);
      const data = o.getImageData(0, 0, cols, rows).data;

      const cell = Math.min(H / rows, W / cols);
      const ox = (W - cols * cell) / 2;
      const oy = (H - rows * cell) / 2;
      particles = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const cr = data[i], cg = data[i + 1], cb = data[i + 2];
          if (cb > cr * 1.05) continue; // drop the blue backdrop
          const lum = (0.299 * cr + 0.587 * cg + 0.114 * cb) / 255;
          const v = Math.pow(Math.min(1, Math.max(0, (lum - 0.04) / 0.6)), 0.85);
          if (v < 0.05) continue;
          const tx = ox + x * cell + cell / 2;
          const ty = oy + y * cell + cell / 2;
          const a = Math.random() * Math.PI * 2;
          const r = Math.max(W, H) * (0.6 + Math.random() * 0.6);
          particles.push({
            tx, ty,
            x: still ? tx : W / 2 + Math.cos(a) * r,
            y: still ? ty : H / 2 + Math.sin(a) * r,
            vx: 0, vy: 0,
            size: cell * (0.25 + 0.7 * v),
            alpha: 0.2 + 0.8 * v,
            delay: Math.random() * 0.5,
          });
        }
      }
    };

    const frame = (now: number) => {
      if (!start) start = now;
      const t = still ? 99 : (now - start) / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#e8ecf3";
      for (const p of particles) {
        const local = Math.max(0, t - delay - p.delay);
        const k = local > 0 ? Math.min(0.12, 0.02 + local * 0.08) : 0;
        p.vx += (p.tx - p.x) * k; p.vy += (p.ty - p.y) * k;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 9000) { const f = 900 / (d2 + 60); p.vx += dx * f * 0.05; p.vy += dy * f * 0.05; }
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const ro = new ResizeObserver(() => build());
    const image = new Image();
    image.onload = () => {
      img = image;
      build();
      ro.observe(box);
      raf = requestAnimationFrame(frame);
    };
    image.src = src;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [src, delay, columns, instant]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} aria-hidden="true" />;
}
