import { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/terra/Navbar';
import { Chapters } from '@/components/terra/Chapters';
import { Preloader } from '@/components/terra/Preloader';
import { Tour } from '@/components/terra/Tour';
import { createFilmExperience } from '@/animations/film';
import film from '@/assets/scene.webm.asset.json';
import poster from '@/assets/film-poster.jpg.asset.json';

export default function Homepage() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progressed, setProgressed] = useState(false);
  useEffect(() => {
    if (!root.current || !video.current) return;
    return createFilmExperience(
      root.current,
      video.current,
      () => setReady(true),
      progress => setProgressed(previous => previous === (progress > .02) ? previous : progress > .02),
    );
  }, []);
  return (
    <main className="experience" ref={root}>
      <video
        ref={video}
        className="scroll-film"
        src={film.url}
        poster={poster.url}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        onError={() => { setFailed(true); setReady(true); }}
      />
      <div className={`film-scrim ${ready ? 'is-ready' : ''}`} aria-hidden="true" />
      <Preloader ready={ready} failed={failed} />
      <Navbar />
      <div className="chapter-rail" aria-hidden="true"><span>01</span><div><i /></div><span>05</span></div>
      <Chapters />
      <aside className="side-note"><span>Scroll to trace the craft</span><i /></aside>
      <Tour progressed={progressed} />
    </main>
  );
}
