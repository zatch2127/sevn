import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Tour({ progressed }: { progressed: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const frame = useRef(0);
  const stop = () => { cancelAnimationFrame(frame.current); setPlaying(false); };
  useEffect(() => {
    const interrupt = () => { cancelAnimationFrame(frame.current); setPlaying(false); };
    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('touchstart', interrupt, { passive: true });
    window.addEventListener('keydown', interrupt);
    return () => { interrupt(); window.removeEventListener('wheel', interrupt); window.removeEventListener('touchstart', interrupt); window.removeEventListener('keydown', interrupt); };
  }, []);
  const start = () => {
    const end = document.documentElement.scrollHeight - window.innerHeight;
    const from = window.scrollY;
    const duration = (speed === 1 ? 20000 : 10000) * (1 - from / end);
    const began = performance.now();
    setPlaying(true);
    const tick = (now: number) => {
      const progress = Math.min(1, (now - began) / Math.max(1, duration));
      window.scrollTo({ top: from + (end - from) * progress, behavior: 'instant' });
      if (progress < 1) frame.current = requestAnimationFrame(tick); else setPlaying(false);
    };
    frame.current = requestAnimationFrame(tick);
  };
  return <aside className="tour" aria-label="Experience controls">
    <Button variant="ghost" className="tour-main" onClick={playing ? stop : start} aria-live="polite">{playing ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}{playing ? 'Pause' : progressed ? 'Resume' : 'Start tour'}</Button>
    <Button variant="ghost" className="tour-speed" aria-label="Change tour speed" onClick={() => setSpeed(speed === 1 ? 2 : 1)}>{speed}×</Button>
    {progressed && <Button variant="ghost" className="tour-restart" aria-label="Restart experience" onClick={() => { stop(); window.scrollTo({ top: 0, behavior: 'instant' }); }}><RotateCcw size={14} /></Button>}
  </aside>;
}