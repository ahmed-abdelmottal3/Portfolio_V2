"use client";
import { AnimatedThemeToggler } from "@/src/components/ui/animated-theme-toggler";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope, FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
export default function Dock() {
  const pathname = usePathname();
  const active = pathname;

  const navItems = [
    { icon: <FaHome size={15} />, label: "Home", href: "/" },
    { icon: <FaUser size={15} />, label: "About", href: "/about" },
    { icon: <FaProjectDiagram size={15} />, label: "Projects", href: "/projects" },
    { icon: <FaEnvelope size={15} />, label: "Contact", href: "/contact" },
  ];

  const socialItems = [
    { icon: <FaGithub size={18} />, label: "GitHub", href: "https://github.com/ahmed-abdelmottal3", color: "#fff" },
    { icon: <FaLinkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/abdelmottalie", color: "#0077b5" },
    { icon: <FaWhatsapp size={18} />, label: "WhatsApp", href: "https://wa.me/+201097175212", color: "#25D366" },
  ];

  return (
    <div className="fixed bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-50">
      <nav className="relative flex items-center bg-linear-to-r from-[#1a1a1a] via-[#222121] to-[#1a1a1a] backdrop-blur-2xl rounded-full px-3 py-1 shadow-2xl border border-white/10">

        {/* Background Glow */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-white/5 via-white/10 to-white/5 opacity-50 blur-xl" />
        <div className="absolute -inset-0.5 rounded-3xl bg-linear-to-r from-transparent via-white/20 to-transparent opacity-30 blur-sm" />

        {/* Nav Items */}
        <div className="relative flex items-center gap-1  border-white/20 pr-3">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`relative rounded-full p-1.5 flex items-center justify-center transition-all duration-500 ${isActive
                    ? 'bg-white text-black shadow-2xl shadow-white/50 scale-110'
                    : 'text-gray-400 hover:text-white hover:scale-110'
                    }`}
                >
                  <div className="text-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {item.icon}
                  </div>

                  {isActive && (
                    <>
                      <div className="absolute inset-0 rounded-2xl bg-white animate-ping opacity-20" />
                      <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-white/40 to-white/0 blur-md" />
                    </>
                  )}
                </Link>

                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none">
                  <div className="relative bg-background text-foreground text-xs font-bold px-4 py-1 rounded-full shadow-2xl border border-white/20 backdrop-blur-sm ">
                    {item.label}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-background rotate-45 border-r border-b border-white/20" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Items */}
        <div className="relative flex items-center border-l border-r gap-4 px-3">
          {socialItems.map((item) => (
            <div key={item.href} className="relative group">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:scale-125 transition-all duration-500"
              >
                <div
                  className="text-xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-360"
                  style={{ color: 'inherit' }}
                >
                  {item.icon}
                </div>

                {/* Glow Effect on Hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"
                  style={{ backgroundColor: item.color }}
                />
                <div
                  className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"
                  style={{ backgroundColor: item.color }}
                />
              </a>

              {/* Tooltip */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none">
                <div className="relative bg-background text-foreground text-xs font-bold px-4 py-1 rounded-full shadow-2xl border border-white/20 backdrop-blur-sm ">
                  {item.label}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-background rotate-45 border-r border-b border-white/20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* theme toggle */}
        <div className="relative flex items-center gap-4 pl-3 ">
          <AnimatedThemeToggler
            className="relative text-gray-400 hover:text-white hover:scale-125 transition-all duration-500 p-2 rounded-full cursor-pointer"
          />        </div>

        {/* Decorative Lines */}
        <div className="absolute -top-1 left-1/4 w-20 h-0.5 bg-linear-to-r from-transparent via-white/30 to-transparent blur-sm" />
        <div className="absolute -bottom-1 right-1/4 w-20 h-0.5 bg-linear-to-r from-transparent via-white/30 to-transparent blur-sm" />
      </nav>

      {/* Bottom Shadow */}
      <div className="absolute inset-x-0 -bottom-4 h-8 bg-linear-to-b from-black/20 to-transparent blur-2xl" />
    </div>
  );
}
