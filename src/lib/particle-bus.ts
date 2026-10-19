// Tiny event bus that lets the scroll pager, the background field and the
// page transition talk to each other without a React context.

type PullListener = (pull: number) => void;
type NavigateListener = (href: string, options: { fromBelow?: boolean }) => void;

const pullListeners = new Set<PullListener>();
const navigateListeners = new Set<NavigateListener>();

/** -1..1: negative pulls particles to the top edge, positive to the bottom. */
export function setPull(pull: number) {
  pullListeners.forEach((l) => l(pull));
}

export function onPull(listener: PullListener) {
  pullListeners.add(listener);
  return () => { pullListeners.delete(listener); };
}

/** Ask the page transition to animate to `href`. */
export function navigateWithParticles(href: string, options: { fromBelow?: boolean } = {}) {
  if (navigateListeners.size === 0) {
    window.location.href = href;
    return;
  }
  navigateListeners.forEach((l) => l(href, options));
}

export function onNavigate(listener: NavigateListener) {
  navigateListeners.add(listener);
  return () => { navigateListeners.delete(listener); };
}
