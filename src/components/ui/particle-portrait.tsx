"use client";
import { useEffect, useRef } from "react";

type Particle = {
  tx: number; ty: number;
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number; delay: number;
};

const LIGHT_RADIUS = 110;

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

// Draws a photo as a field of dots that fly into place. Dots near the cursor
// grow and pick up the accent colour, and the whole portrait tilts slightly
// towards the cursor. The canvas fills its parent, so size it with the wrapper.
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
    const light = { x: 0, y: 0, on: 0 };
    const tilt = { x: 0, y: 0 };
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

      // Ease the light and the tilt towards the cursor so movement feels smooth.
      const inside = mouse.x > -1000;
      light.x += ((inside ? mouse.x : light.x) - light.x) * 0.18;
      light.y += ((inside ? mouse.y : light.y) - light.y) * 0.18;
      light.on += ((inside ? 1 : 0) - light.on) * 0.08;
      const tx = inside ? Math.max(-1, Math.min(1, (mouse.x - W / 2) / (W / 2))) : 0;
      const ty = inside ? Math.max(-1, Math.min(1, (mouse.y - H / 2) / (H / 2))) : 0;
      tilt.x += (tx - tilt.x) * 0.06;
      tilt.y += (ty - tilt.y) * 0.06;

      ctx.clearRect(0, 0, W, H);
      const lit: { p: Particle; f: number }[] = [];
      ctx.fillStyle = "#e8ecf3";
      for (const p of particles) {
        const local = Math.max(0, t - delay - p.delay);
        const k = local > 0 ? Math.min(0.12, 0.02 + local * 0.08) : 0;
        // Brighter dots sit "closer", so they shift more with the tilt.
        const depth = 4 + p.alpha * 10;
        const gx = p.tx + tilt.x * depth, gy = p.ty + tilt.y * depth;
        p.vx += (gx - p.x) * k; p.vy += (gy - p.y) * k;
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;

        const dx = p.x - light.x, dy = p.y - light.y;
        const f = light.on * Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / LIGHT_RADIUS);
        const size = p.size * (1 + 0.6 * f * f);
        ctx.globalAlpha = Math.min(1, p.alpha + f * 0.25);
        ctx.fillRect(p.x - (size - p.size) / 2, p.y - (size - p.size) / 2, size, size);
        if (f > 0.05) lit.push({ p, f });
      }

      // Tint the dots under the cursor with the accent colour.
      ctx.fillStyle = "#61dafb";
      for (const { p, f } of lit) {
        const size = p.size * (1 + 0.6 * f * f);
        ctx.globalAlpha = f * f * f * 0.45;
        ctx.fillRect(p.x - (size - p.size) / 2, p.y - (size - p.size) / 2, size, size);
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
