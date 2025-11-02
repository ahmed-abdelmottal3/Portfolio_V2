"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransitionOverlay() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-main pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
