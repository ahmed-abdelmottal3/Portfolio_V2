"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";
import { pageOrder, pageIndex } from "@/src/lib/pages";
import Reveal from "@/src/components/ui/reveal";

// Large link to the next page at the bottom of each main page.
export default function NextPage() {
  const pathname = usePathname();
  const i = pageIndex(pathname);
  if (i < 0) return null;
  const isLast = i === pageOrder.length - 1;
  const next = isLast ? pageOrder[0] : pageOrder[i + 1];
  const nextNumber = isLast ? 1 : i + 2;

  return (
    <Reveal shape="line-top" className="mt-28">
    <Link
      href={next.href}
      className="group flex items-end justify-between gap-6 border-t border-white/10 pt-8"
    >
      <div>
        <p className="font-mono text-xs tracking-[0.3em] text-silver">
          {isLast ? "BACK TO" : "NEXT"} / 0{nextNumber}
        </p>
        <p className="mt-3 text-silver-gradient font-extrabold tracking-tight text-[clamp(36px,6vw,72px)] leading-none">
          {next.label}
        </p>
      </div>
      <span className="mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 text-background transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-[#050507]">
        <BsArrowRight size={22} className="transition-transform group-hover:-rotate-45" />
      </span>
    </Link>
    </Reveal>
  );
}
