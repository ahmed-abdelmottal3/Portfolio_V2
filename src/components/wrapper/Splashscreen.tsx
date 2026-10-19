"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ParticlePortrait from "../ui/particle-portrait";

const FINAL_NAME = "AHMED ABDELMOTTALIE";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!#%&";
const SEEN_KEY = "intro-seen";
const INTRO_MS = 2600;

// Plays once per browser session: the portrait assembles from particles while
// the name scrambles into place, then the intro fades out over the site.
export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [name, setName] = useState(" ");
  const [roleVisible, setRoleVisible] = useState(false);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setName(FINAL_NAME);
    setFadeOut(true);
    setTimeout(() => setShow(false), 600);
  }, []);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) return;
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      if (t < 1.6) {
        const lock = Math.floor(Math.max(0, (t - 0.4) / 1.1) * FINAL_NAME.length);
        let out = "";
        for (let i = 0; i < FINAL_NAME.length; i++) {
          out += i < lock || FINAL_NAME[i] === " " ? FINAL_NAME[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        setName(out);
        raf = requestAnimationFrame(tick);
      } else {
        setName(FINAL_NAME);
        setRoleVisible(true);
      }
    };
    raf = requestAnimationFrame(tick);
    const done = setTimeout(finish, INTRO_MS);
    return () => { cancelAnimationFrame(raf); clearTimeout(done); };
  }, [show, finish]);

  return (
    <div className="relative min-h-screen">
      {children}
      {show && (
        <div
          className={`fixed inset-0 z-[100] bg-[#050507] transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        >
          <div className="absolute left-0 right-0 top-[4vh] h-[72vh]">
            <ParticlePortrait />
          </div>
          <div className="absolute inset-x-0 bottom-[9vh] text-center pointer-events-none px-4">
            <div className="font-extrabold leading-none tracking-tight text-[clamp(30px,7vw,104px)] text-silver-gradient">
              {name}
            </div>
            <div className={`mt-3 text-[clamp(15px,1.6vw,22px)] font-medium text-silver transition-opacity duration-500 ${roleVisible ? "opacity-100" : "opacity-0"}`}>
              <span className="text-cyan">React Native</span> Developer
            </div>
          </div>
          <button
            onClick={finish}
            className="absolute top-5 right-6 text-sm font-medium text-silver border border-white/10 rounded-full px-4 py-2 hover:text-white"
          >
            Skip intro
          </button>
        </div>
      )}
    </div>
  );
}
