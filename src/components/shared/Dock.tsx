"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { pageOrder } from "@/src/lib/pages";

const socials = [
  { icon: <FaGithub size={15} />, label: "GitHub", href: "https://github.com/ahmed-abdelmottal3" },
  { icon: <FaLinkedinIn size={15} />, label: "LinkedIn", href: "https://www.linkedin.com/in/abdelmottalie" },
  { icon: <FaWhatsapp size={15} />, label: "WhatsApp", href: "https://wa.me/+201097175212" },
];

export default function Dock() {
  const pathname = usePathname();
  // Project detail pages still highlight "Projects".
  const active = pathname.startsWith("/projects") ? "/projects" : pathname;

  return (
    <nav
      aria-label="Main"
      className="fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full border border-white/10 bg-[#0b0d12]/80 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
    >
      {pageOrder.map((page, i) => {
        const isActive = active === page.href;
        return (
          <Link
            key={page.href}
            href={page.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative rounded-full px-3 sm:px-4 py-2 text-[13px] font-medium transition-colors ${
              isActive ? "text-[#050507]" : "text-silver hover:text-background"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="dock-active"
                className="absolute inset-0 rounded-full bg-cyan"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative flex items-baseline gap-1.5">
              <span className={`hidden sm:inline font-mono text-[10px] ${isActive ? "text-[#050507]/60" : "text-white/25"}`}>
                0{i + 1}
              </span>
              {page.label}
            </span>
          </Link>
        );
      })}

      <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />

      {socials.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full text-silver transition-colors hover:bg-white/5 hover:text-cyan"
        >
          {s.icon}
        </a>
      ))}
    </nav>
  );
}
