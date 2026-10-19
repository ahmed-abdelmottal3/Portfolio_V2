"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ParticlePortrait from "../ui/particle-portrait";

const FINAL_NAME = "AHMED ABDELMOTTALIE";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!#%&";
const PHOTO_ASPECT = 747 / 1024; // width / height of /me.jpg
const LOAD_MS = 1900;            // loading bar fills in this time
const HOLD_MS = 2200;            // splash hands over to the site here
const EXIT_MS = 1000;            // length of the hand-over

type Rect = { cx: number; cy: number; h: number };

// The portrait is drawn "contain"-fitted and centred in its box, so this is
// where it actually sits on screen.
function photoRect(r: DOMRect): Rect {
  let w = r.width;
  let h = w / PHOTO_ASPECT;
  if (h > r.height) { h = r.height; w = h * PHOTO_ASPECT; }
  return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, h };
}

// Splash screen for the first visit of a session. A loading bar fills while the
// portrait assembles and the name settles, then the portrait flies into its
// place in the home hero and the splash dissolves into the site.
export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(true); // the server always renders it; CSS decides
  const [live, setLive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [name, setName] = useState(" ");
  const [roleVisible, setRoleVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const portraitRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const exitedRef = useRef(false);

  const exit = useCallback(() => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    timers.current.forEach(clearTimeout);
    setProgress(100);
    setName(FINAL_NAME);
    setRoleVisible(true);

    // Fly the portrait onto the hero portrait if this is the home page.
    const box = portraitRef.current;
    const hero = document.getElementById("hero-portrait");
    if (box) {
      const from = box.getBoundingClientRect();
      const a = photoRect(from);
      if (hero) {
        const b = photoRect(hero.getBoundingClientRect());
        box.style.transformOrigin = `${a.cx - from.left}px ${a.cy - from.top}px`;
        box.style.transform = `translate(${b.cx - a.cx}px, ${b.cy - a.cy}px) scale(${b.h / a.h})`;
      } else {
        box.style.transform = "scale(1.08)";
        box.style.opacity = "0";
      }
    }
    setExiting(true);

    // Let the hero start rising while the portrait is still landing.
    setTimeout(() => document.documentElement.classList.remove("intro-pending"), 350);
    setTimeout(() => setMounted(false), EXIT_MS);
  }, []);

  useEffect(() => {
    if (!document.documentElement.classList.contains("intro-pending")) {
      setMounted(false);
      return;
    }
    setLive(true);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = now - start;
      const eased = 1 - Math.pow(1 - Math.min(1, t / LOAD_MS), 3);
      setProgress(Math.round(eased * 100));

      if (t < 1500) {
        const lock = Math.floor(Math.max(0, (t - 400) / 1100) * FINAL_NAME.length);
        let out = "";
        for (let i = 0; i < FINAL_NAME.length; i++) {
          out += i < lock || FINAL_NAME[i] === " " ? FINAL_NAME[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        setName(out);
      } else {
        setName(FINAL_NAME);
        setRoleVisible(true);
      }
      if (t < LOAD_MS && !exitedRef.current) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    timers.current.push(setTimeout(exit, HOLD_MS));

    return () => {
      cancelAnimationFrame(raf);
      timers.current.forEach(clearTimeout);
    };
  }, [exit]);

  return (
    <div className="relative min-h-screen">
      {children}
      {mounted && (
        <div className={`splash fixed inset-0 z-[100] ${exiting ? "pointer-events-none" : ""}`} style={live ? { display: "block" } : undefined} aria-hidden="true">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-[#050507] transition-opacity ease-out"
            style={{ opacity: exiting ? 0 : 1, transitionDuration: "700ms", transitionDelay: exiting ? "250ms" : "0ms" }}
          />

          {/* opening glow */}
          <div className="splash-glow absolute left-1/2 top-[40vh] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(255,255,255,0)_70%)]" />

          {/* portrait */}
          <div
            ref={portraitRef}
            className="absolute left-0 right-0 top-[4vh] h-[72vh] will-change-transform"
            style={{ transition: `transform ${EXIT_MS - 100}ms cubic-bezier(0.65, 0, 0.35, 1), opacity 600ms ease` }}
          >
            <ParticlePortrait />
          </div>

          {/* name */}
          <div
            className="absolute inset-x-0 bottom-[13vh] text-center pointer-events-none px-4 transition-all duration-500"
            style={{ opacity: exiting ? 0 : 1, transform: exiting ? "translateY(-12px)" : "none" }}
          >
            <div className="font-extrabold leading-none tracking-tight text-[clamp(30px,7vw,104px)] text-silver-gradient">
              {name}
            </div>
            <div className={`mt-3 text-[clamp(15px,1.6vw,22px)] font-medium text-silver transition-opacity duration-500 ${roleVisible ? "opacity-100" : "opacity-0"}`}>
              <span className="text-cyan">React Native</span> Developer
            </div>
          </div>

          {/* loader */}
          <div
            className="absolute inset-x-6 sm:inset-x-10 bottom-8 transition-opacity duration-300"
            style={{ opacity: exiting ? 0 : 1 }}
          >
            <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-[0.3em] text-silver">
              <span>LOADING PORTFOLIO</span>
              <span className="tabular-nums text-background">{String(progress).padStart(3, "0")}%</span>
            </div>
            <div className="h-px w-full bg-white/10">
              <div className="h-px bg-cyan" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <button
            onClick={exit}
            className="pointer-events-auto absolute top-5 right-6 text-sm font-medium text-silver border border-white/10 rounded-full px-4 py-2 transition hover:text-white"
            style={{ opacity: exiting ? 0 : 1 }}
          >
            Skip intro
          </button>
        </div>
      )}
    </div>
  );
}
