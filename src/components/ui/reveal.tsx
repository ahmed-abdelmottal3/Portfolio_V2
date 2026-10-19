"use client";
import { createElement, useEffect, useRef, useState } from "react";
import { playReveal, type RevealShape } from "@/src/lib/particle-reveal";

type Props = {
  as?: keyof React.JSX.IntrinsicElements;
  shape?: RevealShape;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & Record<string, unknown>;

const covered = () =>
  document.documentElement.classList.contains("intro-pending") ||
  document.documentElement.classList.contains("page-transitioning");

// Wraps a section so it appears through particles the first time it scrolls
// into view: dots trace its border (or a line), then the content fades in.
export default function Reveal({ as = "div", shape = "outline", className = "", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }

    let wait: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Never play under the splash or a page transition; wait for the cover to lift.
        const start = () => playReveal(el, shape, () => setShown(true));
        if (!covered()) start();
        else wait = setInterval(() => { if (!covered()) { clearInterval(wait); start(); } }, 80);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => { io.disconnect(); clearInterval(wait); };
  }, [shape]);

  return createElement(
    as,
    { ref, "data-reveal": "", "data-revealed": shown ? "" : undefined, className, ...rest },
    children,
  );
}
