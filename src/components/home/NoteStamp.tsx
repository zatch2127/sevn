import { useId, type ReactNode } from 'react';
import type { Note } from './homeData';

function NoteIcon({ icon }: { icon: Note['icon'] }) {
  if (icon === 'sun') {
    return (
      <g className="note-stamp__icon">
        <circle cx="0" cy="0" r="7" />
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index * 30 * Math.PI) / 180;
          return <path key={index} d={`M${(Math.cos(angle) * 10).toFixed(1)} ${(Math.sin(angle) * 10).toFixed(1)} L${(Math.cos(angle) * 14).toFixed(1)} ${(Math.sin(angle) * 14).toFixed(1)}`} />;
        })}
      </g>
    );
  }

  const drawings: Record<Exclude<Note['icon'], 'sun'>, ReactNode> = {
    burst: (
      <g className="note-stamp__icon">
        <circle className="note-stamp__dot" cx="0" cy="0" r="1.8" />
        {Array.from({ length: 16 }, (_, index) => {
          const angle = (index * 22.5 * Math.PI) / 180;
          const radius = index % 2 ? 10 : 15;
          return <path key={index} d={`M${(Math.cos(angle) * 3).toFixed(1)} ${(Math.sin(angle) * 3).toFixed(1)} L${(Math.cos(angle) * radius).toFixed(1)} ${(Math.sin(angle) * radius).toFixed(1)}`} />;
        })}
      </g>
    ),
    swirl: <g className="note-stamp__icon"><path d="M-14 6 C-8 -6 2 -8 6 -2 C9 3 4 7 1 4 C-2 1 2 -3 6 -1 M-14 10 C-7 -2 3 -4 8 1 M-13 2 C-7 -9 4 -12 10 -6 M11 -12v4 M9 -10h4 M-13 12v3 M-14.5 13.5h3" /></g>,
    layers: <g className="note-stamp__icon"><path d="M-13 -8h26 M-13 -2c6 -4 10 4 16 0s7 -3 10 0 M-13 4c6 -4 10 4 16 0s7 -3 10 0 M-13 10h26" /></g>,
    spiral: <g className="note-stamp__icon"><path strokeDasharray="1.4 2.2" d="M0 0m0 -1.5a1.5 1.5 0 1 1-1.4 1a3.6 3.6 0 1 0 3.6-3a6.4 6.4 0 1 0-6 8.4a9.5 9.5 0 1 0-8.4-10 M9 -9v3.4 M7.3 -7.3h3.4 M-9 10v3 M-10.5 11.5h3" /></g>,
    stack: <g className="note-stamp__icon"><path d="M-12 -8c5 -5 19 -5 24 0c-5 3 -19 3 -24 0z M-12 -1c6 -3 10 3 16 0s6 -2 8 0c-4 3 -20 3 -24 0z M-12 6c6 -3 10 3 16 0s6 -2 8 0c-4 3 -20 3 -24 0z M-12 11c5 4 19 4 24 0" /></g>,
    star: <g className="note-stamp__icon"><path d="M0 -15C2 -5 5 -2 14 0C5 2 2 5 0 15C-2 5 -5 2 -14 0C-5 -2 -2 -5 0 -15z" /></g>,
  };

  return drawings[icon];
}

export function NoteStamp({ note, spin = false }: { note: Note; spin?: boolean }) {
  const textPathId = useId().replaceAll(':', '');
  return (
    <svg className={`note-stamp${spin ? ' is-spinning' : ''}`} viewBox="-60 -72 120 144" role="img" aria-label={note.ring}>
      <path className="note-stamp__ring" d="M0 -66C34 -66 52 -46 52 0C52 46 34 66 0 66C-34 66 -52 46 -52 0C-52 -46 -34 -66 0 -66z" />
      <g className="note-stamp__ring-text">
        <path id={textPathId} fill="none" d="M0 -58C30 -58 45 -40 45 0C45 40 30 58 0 58C-30 58 -45 40 -45 0C-45 -40 -30 -58 0 -58z" />
        <text><textPath href={`#${textPathId}`} startOffset="25%" textAnchor="middle">{note.ring}</textPath></text>
      </g>
      <NoteIcon icon={note.icon} />
    </svg>
  );
}
