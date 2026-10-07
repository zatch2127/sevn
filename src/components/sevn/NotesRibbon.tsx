import { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import data from '@/data/sevn.json';
import './notes-ribbon.css';

const noteMarks = ['☼', '✳', '≈', '≋', '◌', '≡', '✧'];

export function NotesRibbon() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const updatePosition = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const travel = window.innerHeight + bounds.height;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / travel));
      track.style.setProperty('--notes-scroll-progress', String(progress));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const notes = data.notes.map((note, index) => (
    <Link
      className="notes-ribbon__item"
      to="/story"
      key={note.id}
      aria-label={`${note.word.replaceAll('&amp;', '&')} — read the SEVN story`}
    >
      <span className="notes-ribbon__mark" aria-hidden="true">{noteMarks[index] ?? '✧'}</span>
      <span>{note.word.replaceAll('&amp;', '&')}</span>
    </Link>
  ));

  return (
    <section className="notes-ribbon" ref={sectionRef} aria-label="The seven notes at SEVN">
      <div className="notes-ribbon__sticky">
        <div className="notes-ribbon__track" ref={trackRef}>
          <div className="notes-ribbon__group">{notes}</div>
          <div className="notes-ribbon__group" aria-hidden="true">
            {data.notes.map((note, index) => (
              <span className="notes-ribbon__item" key={note.id}>
                <span className="notes-ribbon__mark">{noteMarks[index] ?? '✧'}</span>
                <span>{note.word.replaceAll('&amp;', '&')}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
