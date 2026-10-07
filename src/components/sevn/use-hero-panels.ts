import { useCallback, useEffect, useRef } from 'react';

export function useHeroPanels(setSlide: (slide: number) => void) {
  const panelRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animations = useRef<Animation[]>([]);

  const play = useCallback((next?: number) => {
    if (busy.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (next !== undefined) setSlide(next);
      return;
    }
    const panels = panelRef.current?.querySelectorAll<HTMLElement>('.hero-reveal-panel');
    if (!panels?.length) return;
    busy.current = true;
    animations.current.forEach(animation => animation.cancel());
    animations.current = Array.from(panels).map((panel, index) => panel.animate(
      next === undefined
        ? [{ transform: 'translateX(0)' }, { transform: 'translateX(101%)' }]
        : [{ transform: 'translateX(-101%)', offset: 0 }, { transform: 'translateX(0)', offset: .36 }, { transform: 'translateX(0)', offset: .55 }, { transform: 'translateX(101%)', offset: 1 }],
      { duration: next === undefined ? 1200 : 1800, delay: index * 85, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' }
    ));
    if (next !== undefined) timer.current = setTimeout(() => setSlide(next), 980);
    Promise.all(animations.current.map(animation => animation.finished)).then(() => {
      busy.current = false;
    }).catch(() => { busy.current = false; });
  }, [setSlide]);

  useEffect(() => {
    play();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      animations.current.forEach(animation => animation.cancel());
      busy.current = false;
    };
  }, [play]);
  return { panelRef, changeSlide: play };
}