"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function FramerWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 60, rotateY: 10, scale: 0.98, filter: "blur(6px)" }}
          animate={{
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            x: -60,
            rotateY: -10,
            scale: 0.97,
            filter: "blur(4px)",
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity, filter",
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
