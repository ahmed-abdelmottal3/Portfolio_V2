"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navigateWithParticles, onNavigate } from "@/src/lib/particle-bus";
import { pageOrder, pageIndex } from "@/src/lib/pages";
import { projects } from "@/src/lib/projects";

const GATHER_MS = 520;
const SCATTER_MS = 650;
const FROM_BELOW_KEY = "pager-from-below";

type Dot = { sx: number; sy: number; tx: number; ty: number; ex: number; ey: number; r: number; delay: number };

function labelFor(href: string) {
  const i = pageIndex(href);
  if (i >= 0) return { index: `0${i + 1}`, word: pageOrder[i].label };
  const project = projects.find((p) => `/projects/${p.id}` === href);
  return { index: "03", word: project ? project.title.split(" - ")[0] : "Project" };
}

// Every in-site navigation runs through here: particles gather into the name
// of the next page, the route changes underneath, then they scatter away.
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const [caption, setCaption] = useState("");
  const busy = useRef(false);
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  // Catch plain clicks on internal links anywhere on the site.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || /\.[a-z0-9]+$/i.test(url.pathname)) return;
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      navigateWithParticles(url.pathname);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    return onNavigate((href, { fromBelow }) => {
      if (busy.current || href === pathRef.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (reduce || !canvas || !ctx) {
        router.push(href);
        return;
      }
      busy.current = true;
      try { if (fromBelow) sessionStorage.setItem(FROM_BELOW_KEY, href); } catch {}
      const { index, word } = labelFor(href);
      setCaption(`${index} / ${word.toUpperCase()}`);
      setActive(true);
      document.documentElement.classList.add("page-transitioning");

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = window.innerWidth, H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Render the word off-screen and sample its pixels as dot targets.
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const o = off.getContext("2d")!;
      const family = getComputedStyle(document.body).fontFamily;
      let size = Math.min(W * (W < 640 ? 0.22 : 0.16), 200);
      o.font = `800 ${size}px ${family}`;
      const measured = o.measureText(word).width;
      if (measured > W * 0.86) { size *= (W * 0.86) / measured; o.font = `800 ${size}px ${family}`; }
      o.fillStyle = "#fff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillText(word, W / 2, H / 2);
      const data = o.getImageData(0, 0, W, H).data;
      const gap = Math.max(2, Math.round(size / 32));
      const dots: Dot[] = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] < 128) continue;
          const a = Math.random() * Math.PI * 2;
          const r = Math.max(W, H) * (0.55 + Math.random() * 0.4);
          const e = 80 + Math.random() * 260;
          dots.push({
            sx: W / 2 + Math.cos(a) * r, sy: H / 2 + Math.sin(a) * r,
            tx: x, ty: y,
            ex: x + Math.cos(a) * e, ey: y + Math.sin(a) * e,
            r: Math.max(1.2, gap * 0.45),
            delay: Math.random() * 0.25,
          });
        }
      }

      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const start = performance.now();
      let navigated = false;
      let scatterStart = 0;
      let raf = 0;

      const frame = (now: number) => {
        const t = now - start;
        ctx.clearRect(0, 0, W, H);

        // Backdrop: fades in while gathering, out while scattering.
        let cover = Math.min(1, t / (GATHER_MS * 0.7));
        if (scatterStart) cover = Math.max(0, 1 - (now - scatterStart) / (SCATTER_MS * 0.8));
        ctx.globalAlpha = cover;
        ctx.fillStyle = "#050507";
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = "#e8ecf3";
        for (const d of dots) {
          let x: number, y: number, alpha: number;
          if (!scatterStart) {
            const p = ease(Math.min(1, Math.max(0, (t / GATHER_MS - d.delay) / (1 - d.delay))));
            x = d.sx + (d.tx - d.sx) * p; y = d.sy + (d.ty - d.sy) * p; alpha = p;
          } else {
            const p = ease(Math.min(1, (now - scatterStart) / SCATTER_MS));
            x = d.tx + (d.ex - d.tx) * p; y = d.ty + (d.ey - d.ty) * p; alpha = 1 - p;
          }
          ctx.globalAlpha = alpha;
          ctx.fillRect(x, y, d.r, d.r);
        }
        ctx.globalAlpha = 1;

        if (!navigated && t >= GATHER_MS) {
          navigated = true;
          router.push(href, { scroll: !fromBelow });
          // Give the new page a moment to render under the cover, then scatter.
          setTimeout(() => {
            scatterStart = performance.now();
            document.documentElement.classList.remove("page-transitioning");
            setCaption("");
          }, 220);
        }

        if (scatterStart && now - scatterStart >= SCATTER_MS) {
          ctx.clearRect(0, 0, W, H);
          setActive(false);
          busy.current = false;
          return;
        }
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
      return () => cancelAnimationFrame(raf);
    });
  }, [router]);

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[90] ${active ? "" : "invisible"}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <p
        className={`absolute inset-x-0 top-[calc(50%+min(9vw,110px))] text-center font-mono text-xs tracking-[0.4em] text-cyan transition-opacity duration-300 ${
          caption ? "opacity-100" : "opacity-0"
        }`}
      >
        {caption}
      </p>
    </div>
  );
}
