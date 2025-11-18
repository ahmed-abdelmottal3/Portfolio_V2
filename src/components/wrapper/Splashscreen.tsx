"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800); // يبدأ الفيد أوت
    const endTimer = setTimeout(() => setLoading(false), 2000); // يختفي بعد ثانيتين
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {loading && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-main overflow-hidden transition-all duration-700 ${
            fadeOut ? "opacity-0 scale-[1.2]" : "opacity-100 scale-100"
          }`}
        >
          <div className="animate-bounce-slow">
            <Image
              src="/mylogowhite.webp"
              alt="App Logo"
              width={180}
              height={180}
              className="mb-4"
            />
          </div>
        </div>
      )}
      <div className={`${loading ? "hidden" : "block"} transition-opacity duration-700`}>
        {children}
      </div>

      <style jsx>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s infinite;
        }
      `}</style>
    </div>
  );
}
