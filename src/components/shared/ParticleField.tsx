"use client";
import { useEffect, useRef } from "react";
import { onPull } from "@/src/lib/particle-bus";

type Dot = { x: number; y: number; vx: number; vy: number; r: number; a: number };

// Faint dots drifting behind every page. When the scroll pager builds up a
// pull, the dots are drawn towards the edge you are scrolling past.
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0;
    let dots: Dot[] = [];
    let pull = 0, shownPull = 0;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(160, (W * H) / 9000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: 0.6 + Math.random() * 1.2,
        a: 0.08 + Math.random() * 0.22,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      shownPull += (pull - shownPull) * 0.15;
      const towards = shownPull > 0 ? H + 60 : -60;
      const strength = Math.abs(shownPull);

      for (const d of dots) {
        if (!still) {
          if (strength > 0.01) {
            // Pull towards the middle of the edge being scrolled past.
            d.vx += (W / 2 - d.x) * 0.00012 * strength;
            d.vy += (towards - d.y) * 0.0006 * strength;
          } else {
            d.vx += (Math.random() - 0.5) * 0.01;
            d.vy += (Math.random() - 0.5) * 0.01;
          }
          d.vx *= 0.96; d.vy *= 0.96;
          d.x += d.vx; d.y += d.vy;
          // Drift back on screen from the opposite side.
          if (d.x < -10) d.x = W + 10; else if (d.x > W + 10) d.x = -10;
          if (d.y < -80) d.y = H + 10; else if (d.y > H + 80) d.y = -10;
        }
        const glow = strength * (shownPull > 0 ? d.y / H : 1 - d.y / H);
        ctx.globalAlpha = Math.min(0.9, d.a + glow * 0.6);
        ctx.fillStyle = glow > 0.25 ? "#61dafb" : "#e8ecf3";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r + glow * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = still ? 0 : requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (!raf && !still) raf = requestAnimationFrame(draw);
    };
    const onResize = () => { seed(); if (still) draw(); };

    seed();
    draw();
    const offPull = onPull((p) => { pull = p; });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      offPull();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
