// Main pages in navigation order. The tab bar and scroll paging both read this.
export const pageOrder = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export function pageIndex(pathname: string) {
  return pageOrder.findIndex((p) => p.href === pathname);
}
