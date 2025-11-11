"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1800); // يبدأ الفيد أوت
    const endTimer = setTimeout(() => setLoading(false), 2000); // يختفي بعد ثانيتين
    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {loading && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-main transition-opacity duration-700 ${
            fadeOut ? "opacity-0 scale-[1.1]" : "opacity-100 scale-100"
          }`}
        >
          <div className="flex flex-col items-center justify-center transition-transform duration-600">
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
    </div>
  );
}
