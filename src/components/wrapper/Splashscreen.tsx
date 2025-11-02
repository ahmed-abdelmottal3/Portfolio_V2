"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-main"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center"
            >
              <Image
                src="/mylogowhite.webp"
                alt="App Logo"
                width={180}
                height={180}
                className="mb-4"
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
