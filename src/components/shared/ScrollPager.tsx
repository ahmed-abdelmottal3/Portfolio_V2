"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { pageOrder, pageIndex } from "@/src/lib/pages";

const WHEEL_DISTANCE = 480; // wheel delta needed past the edge to change page
const TOUCH_DISTANCE = 140; // finger travel needed past the edge
const COOLDOWN_MS = 1200;
const FROM_BELOW_KEY = "pager-from-below";

// Scrolling past the bottom of a page moves to the next page, scrolling past
// the top moves back. A small hint fills up first so it never feels accidental.
export default function ScrollPager() {
  const pathname = usePathname();
  const router = useRouter();
  const index = pageIndex(pathname);
  const prev = index > 0 ? pageOrder[index - 1] : null;
  const next = index >= 0 && index < pageOrder.length - 1 ? pageOrder[index + 1] : null;

  const [pull, setPull] = useState(0); // -1..1, negative = towards previous page
  const pullRef = useRef(0);
  const lockUntil = useRef(0);

  useEffect(() => {
    if (next) router.prefetch(next.href);
    if (prev) router.prefetch(prev.href);
    lockUntil.current = Date.now() + 700; // ignore leftover momentum from the last page
    pullRef.current = 0;
    setPull(0);

    // Arriving from the page below: start at the bottom so scrolling up keeps going.
    let fromBelow = false;
    try { fromBelow = sessionStorage.getItem(FROM_BELOW_KEY) === pathname; sessionStorage.removeItem(FROM_BELOW_KEY); } catch {}
    if (fromBelow) {
      const id = setTimeout(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }), 60);
      return () => clearTimeout(id);
    }
  }, [pathname, next, prev, router]);

  useEffect(() => {
    if (index < 0) return;
    let decay: ReturnType<typeof setTimeout> | undefined;
    let touchY: number | null = null;

    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    const atTop = () => window.scrollY <= 2;

    const update = (value: number) => {
      pullRef.current = Math.max(-1, Math.min(1, value));
      setPull(pullRef.current);
      if (pullRef.current >= 1 && next) go(next.href, false);
      else if (pullRef.current <= -1 && prev) go(prev.href, true);
    };

    const go = (href: string, fromBelow: boolean) => {
      lockUntil.current = Date.now() + COOLDOWN_MS;
      try { if (fromBelow) sessionStorage.setItem(FROM_BELOW_KEY, href); } catch {}
      pullRef.current = 0;
      setPull(0);
      router.push(href);
    };

    const scheduleReset = () => {
      clearTimeout(decay);
      decay = setTimeout(() => update(0), 450);
    };

    const onWheel = (e: WheelEvent) => {
      if (Date.now() < lockUntil.current) return;
      const p = pullRef.current;
      if (e.deltaY > 0 && next && atBottom()) update(Math.max(0, p) + e.deltaY / WHEEL_DISTANCE);
      else if (e.deltaY < 0 && prev && atTop()) update(Math.min(0, p) + e.deltaY / WHEEL_DISTANCE);
      else if (p !== 0) update(0);
      scheduleReset();
    };

    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null || Date.now() < lockUntil.current) return;
      const dy = touchY - e.touches[0].clientY; // positive = swiping up = scrolling down
      if (dy > 0 && next && atBottom()) update(dy / TOUCH_DISTANCE);
      else if (dy < 0 && prev && atTop()) update(dy / TOUCH_DISTANCE);
    };
    const onTouchEnd = () => {
      touchY = null;
      if (Math.abs(pullRef.current) < 1) update(0);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      clearTimeout(decay);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [index, next, prev, router]);

  if (index < 0) return null;

  const target = pull > 0 ? next : pull < 0 ? prev : null;
  const amount = Math.abs(pull);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-1/2 z-40 -translate-x-1/2 transition-opacity duration-200 ${
        pull < 0 ? "top-6" : "bottom-24 sm:bottom-28"
      } ${amount > 0.04 && target ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex flex-col items-center gap-2 rounded-full border border-white/10 bg-[#0b0d12]/80 px-5 py-2.5 backdrop-blur-xl">
        <span className="text-xs font-medium text-silver">
          {pull < 0 ? "↑ Keep scrolling for " : "Keep scrolling for "}
          <span className="text-background">{target?.label}</span>
          {pull < 0 ? "" : " ↓"}
        </span>
        <span className="h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
          <span
            className="block h-full rounded-full bg-cyan transition-[width] duration-75"
            style={{ width: `${Math.min(1, amount) * 100}%` }}
          />
        </span>
      </div>
    </div>
  );
}
