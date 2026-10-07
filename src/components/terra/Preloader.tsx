import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function Preloader({ ready, failed }: { ready: boolean; failed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ready || !ref.current) return;
    const tween = gsap.to(ref.current, { autoAlpha: 0, duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : .65, ease: 'power1.inOut' });
    return () => { tween.kill(); };
  }, [ready]);
  return <div className="film-loader" ref={ref} role="status" aria-hidden={ready}>
    {failed ? 'The film could not be loaded.' : <>Preparing the brew<span>.</span><span>.</span><span>.</span></>}
  </div>;
}