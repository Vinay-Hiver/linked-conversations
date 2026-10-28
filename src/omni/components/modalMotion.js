import React from 'react';

/** How long the exit animation runs (modalMotion.css uses the same value). */
export const MODAL_EXIT_MS = 220;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Plays a modal's exit animation before it closes. `exit(fn)` adds the closing state (the
 * reverse of the entrance, see modalMotion.css) and runs `fn` once it has finished.
 */
export function useModalExit() {
  const [closing, setClosing] = React.useState(false);
  const timer = React.useRef();
  React.useEffect(() => () => clearTimeout(timer.current), []);
  const exit = React.useCallback((fn) => {
    if (timer.current) return; // already closing
    setClosing(true);
    timer.current = setTimeout(() => fn?.(), prefersReducedMotion() ? 0 : MODAL_EXIT_MS);
  }, []);
  return [closing, exit];
}
