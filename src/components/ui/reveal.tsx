import { createElement } from "react";

type Props = {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Record<string, unknown>;

// Marks a block that rebuilds itself from particles when it scrolls into view.
// The site-wide ParticleRevealer does the work; this only adds the marker.
export default function Reveal({ as = "div", shape: _shape, children, ...rest }: Props) {
  return createElement(as, { "data-reveal": "", ...rest }, children);
}
