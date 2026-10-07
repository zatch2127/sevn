import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, CakeSlice, Coffee, Croissant, Layers, Sandwich, Sparkles, Sun } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import data from '@/data/sevn.json';
import { itemPhotos } from './product-photos';
import './note-explorer.css';

const decode = (value: string) => value.replaceAll('&amp;', '&');

const noteDetails: Record<string, { image: string; alt: string; Icon: LucideIcon }> = {
  quiet: { image: 'Espresso', alt: 'Freshly pulled espresso for a quiet morning', Icon: Sun },
  bold: { image: 'Date &amp; Cardamom Latte', alt: 'Date and cardamom latte with a soft, spiced finish', Icon: Sparkles },
  golden: { image: 'Butter Croissant', alt: 'Golden butter croissant from the bakehaus', Icon: Croissant },
  fresh: { image: 'Truffle Mushroom Sourdough', alt: 'Truffle mushroom sourdough on a plate', Icon: Layers },
  soft: { image: 'Burnt Basque Cheesecake', alt: 'Burnt Basque cheesecake with a caramelised top', Icon: CakeSlice },
  stack: { image: 'Mediterranean Chicken Sandwich', alt: 'Mediterranean chicken sandwich from the kitchen', Icon: Sandwich },
  deep: { image: 'Cold Brew Reserve', alt: 'A glass of slow-steeped cold brew', Icon: Coffee },
};

export function NoteExplorer() {
  const [activeId, setActiveId] = useState(data.notes[0]?.id ?? 'quiet');
  const activeNote = data.notes.find(note => note.id === activeId) ?? data.notes[0];
  if (!activeNote) return null;

  const details = noteDetails[activeNote.id];
  const photo = details ? itemPhotos[details.image] : undefined;
  const Icon = details?.Icon ?? Sparkles;
  const category = data.menu.find(section => section.note === activeNote.id);

  return (
    <section className="note-explorer" aria-labelledby="note-explorer-title">
      <div className="note-explorer__inner container">
        <div className="note-explorer__copy">
          <p className="eyebrow">The seven notes</p>
          <h2 id="note-explorer-title">What are you<br /><em>here for?</em></h2>
          <p className="note-explorer__intro">A small ritual for every kind of day. Choose a note to find your moment at SEVN.</p>

          <div className="note-explorer__choices" role="group" aria-label="Choose a SEVN note">
            {data.notes.map((note, index) => {
              const NoteIcon = noteDetails[note.id]?.Icon ?? Sparkles;
              const selected = note.id === activeNote.id;
              return (
                <button
                  className="note-explorer__choice"
                  type="button"
                  key={note.id}
                  aria-pressed={selected}
                  onClick={() => setActiveId(note.id)}
                >
                  <span className="note-explorer__number">0{index + 1}</span>
                  <NoteIcon aria-hidden="true" />
                  <span>{decode(note.mood)}</span>
                  <span className="note-explorer__arrow" aria-hidden="true">↗</span>
                </button>
              );
            })}
          </div>
        </div>

        {photo && details && (
          <figure className="note-explorer__visual" key={activeNote.id}>
            <img src={photo.src} alt={details.alt} width="960" height="1100" loading="lazy" />
            <div className="note-explorer__stamp" aria-hidden="true">
              <Icon />
              <span>{decode(activeNote.ring)}</span>
            </div>
            <figcaption>
              <span>{decode(activeNote.ring)}</span>
              <p>{decode(activeNote.whisper)}</p>
              {category && (
                <Link to="/menu" search={{ note: activeNote.id }}>
                  Explore {decode(category.title)} <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
