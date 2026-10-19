"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { playReveal } from "@/src/lib/particle-reveal";

// Elements that rebuild from particles when they first scroll into view.
// Nested matches are skipped: the outermost one draws its children too.
const SELECTOR = "[data-reveal], .hero-rise, section img";

const covered = () =>
  document.documentElement.classList.contains("intro-pending") ||
  document.documentElement.classList.contains("page-transitioning");

export default function ParticleRevealer() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<Element>();
    const timers: ReturnType<typeof setTimeout>[] = [];

    const show = (el: HTMLElement) => { el.dataset.revealed = ""; };

    const start = (el: HTMLElement) => {
      const delay = (parseFloat(getComputedStyle(el).getPropertyValue("--d")) || 0) * 1000;
      timers.push(setTimeout(() => playReveal(el, () => show(el)), delay));
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          if (!covered()) { start(el); continue; }
          const wait = setInterval(() => { if (!covered()) { clearInterval(wait); start(el); } }, 80);
          timers.push(wait as unknown as ReturnType<typeof setTimeout>);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const scan = () => {
      const all = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      for (const el of all) {
        if (seen.has(el) || "revealed" in el.dataset) continue;
        // Inside another revealing element: that one draws it.
        if (el.parentElement?.closest(SELECTOR)) { el.dataset.revealed = ""; continue; }
        seen.add(el);
        el.dataset.revealable = "";
        if (reduce) show(el);
        else io.observe(el);
      }
    };

    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
    };
  }, [pathname]);

  return null;
}
