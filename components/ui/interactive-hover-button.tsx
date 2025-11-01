import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group bg-background relative w-auto cursor-pointer overflow-hidden rounded-full border p-1 px-6 text-center font-medium text-foreground text-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className=" bg-gradient-to-r from-blue-200 via-blue-500 to-purple-500 h-2 w-2 rounded-full transition-all duration-500 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-500 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="text-background absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-500 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight size={18} />
      </div>
    </button>
  )
}
