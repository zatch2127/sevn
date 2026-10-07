import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters } from '@/lib/chapters';

/** Reference film seek scheduler: exponential damping 13, 18ms threshold. */
export function createFilmExperience(root: HTMLElement, video: HTMLVideoElement, onReady: () => void, onProgress: (progress: number) => void) {
  gsap.registerPlugin(ScrollTrigger);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let target = 0, current = 0, pending: number | null = null, seeking = false;
  let trigger: ScrollTrigger | undefined;
  const seek = (time: number) => {
    if (seeking) { pending = time; return; }
    if (Math.abs(video.currentTime - time) < .018) return;
    seeking = true;
    video.currentTime = time;
  };
  const seeked = () => { seeking = false; const next = pending; pending = null; if (next !== null) seek(next); };
  const tick = (_time: number, delta: number) => {
    current += (target - current) * (reduced ? 1 : 1 - Math.exp(-13 * Math.min(.08, delta / 1000)));
    if (!reduced) seek(current);
  };
  const ready = () => {
    if (trigger) return;
    onReady();
    const bar = root.querySelector('.chapter-rail i');
    const number = root.querySelector('.chapter-rail > span');
    const pressure = root.querySelector('.pressure-readout b');
    trigger = ScrollTrigger.create({
      trigger: root, start: 'top top', end: 'bottom bottom', invalidateOnRefresh: true,
      onUpdate: ({ progress }) => {
        target = progress * Math.max(0, video.duration - .025);
        if (bar) gsap.set(bar, { scaleX: progress });
        const active = [...chapters].reverse().find(chapter => progress >= chapter.start) ?? chapters[0];
        if (number && active) number.textContent = active.number;
        if (pressure) pressure.textContent = `${Math.round(9 + progress * 3)}.0`;
        onProgress(progress);
      },
    });
    gsap.ticker.add(tick);
    ScrollTrigger.refresh();
  };
  video.addEventListener('loadedmetadata', ready);
  video.addEventListener('seeked', seeked);
  if (video.readyState >= 1) ready();
  return () => { trigger?.kill(); gsap.ticker.remove(tick); video.removeEventListener('loadedmetadata', ready); video.removeEventListener('seeked', seeked); };
}

export function goToChapter(index: number) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chapter = chapters[index];
  if (!chapter) return;
  window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * chapter.start, behavior: reduced ? 'instant' : 'smooth' });
}