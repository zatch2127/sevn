import { useState, type ReactNode, type RefObject } from 'react';
import { dayAtSevn, journalEntries, notes, picks, visit, isOpenNow, type Note } from './homeData';
import { NoteStamp } from './NoteStamp';
import { PhotoFrame } from './PhotoFrame';

function WaveBundle() {
  return (
    <svg className="wave-bundle" viewBox="0 0 1440 34" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => {
        const y = 6 + index * 3.4;
        return <path key={index} d={`M0 ${y} C120 ${y - 5} 240 ${y + 5} 360 ${y}S600 ${y - 5} 720 ${y}S960 ${y + 5} 1080 ${y}S1320 ${y - 5} 1440 ${y}`} />;
      })}
    </svg>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <div className={`home-reveal${delay ? ` reveal-delay-${delay}` : ''}`}>{children}</div>;
}

export function HeroSection() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__copy">
          <h1 className="dsp dsp-hero">
            <span className="home-mask"><span>ELEVATING</span></span>
            <span className="home-mask delay-1"><span>EVERYDAY</span></span>
            <span className="home-mask delay-2"><span>MOMENTS.</span></span>
          </h1>
          <Reveal delay={2}>
            <p className="body home-hero__intro">Café &amp; Bakehaus. Rooted in craftsmanship, guided by simplicity.</p>
          </Reveal>
          <Reveal delay={3}>
            <div className="home-cue"><span className="home-cue__stem" /><span className="lbl">Scroll</span></div>
          </Reveal>
        </div>
        <div className="home-hero__photo">
          <PhotoFrame caption="Photograph — hands finishing a pour, close, warm light" />
        </div>
      </section>
      <WaveBundle />
    </>
  );
}

export function MoodSection() {
  const [active, setActive] = useState<Note | null>(null);
  const clear = () => setActive(null);

  return (
    <section className="home-section">
      <div className="home-wrap">
        <p className="lbl home-reveal">What are you here for?</p>
        <div className="home-moods">
          <div className={`home-mood-list${active ? ' is-hot' : ''}`} onMouseLeave={clear} onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) clear();
          }}>
            {notes.map((note, index) => (
              <a
                className={`home-mood home-reveal reveal-delay-${(index % 3) + 1}${active?.id === note.id ? ' is-active' : ''}`}
                href={`#/menu?note=${note.id}`}
                key={note.id}
                onFocus={() => setActive(note)}
                onMouseEnter={() => setActive(note)}
              >
                {note.mood}
              </a>
            ))}
          </div>
          <div className="home-mood-detail">
            <div className="home-mood-pane">
              {notes.map((note, index) => (
                <div className={`home-mood-frame${active?.id === note.id ? ' is-active' : ''}`} key={note.id}>
                  <PhotoFrame caption={`Photograph — ${note.mood.toLowerCase()}`} />
                </div>
              ))}
              {active && <div className="home-mood-stamp"><NoteStamp note={active} spin /></div>}
            </div>
            <p className="home-mood-caption" aria-live="polite">{active?.whisper ?? ''}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PicksSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="home-section on-cream">
      <div className="home-wrap">
        <p className="lbl home-reveal">A few things worth ordering</p>
        <div className="home-picks">
          <div className={`home-pick-list${active !== null ? ' is-hot' : ''}`} onMouseLeave={() => setActive(null)} onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActive(null);
          }}>
            {picks.map((pick, index) => (
              <a
                className={`home-pick home-reveal reveal-delay-${index + 1}${active === index ? ' is-active' : ''}`}
                href="#/menu"
                key={pick.name}
                onFocus={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
              >
                <span className="home-pick__name">{pick.name}</span>
                <span className="home-pick__description"><span>{pick.description}</span><span>${pick.price}</span></span>
              </a>
            ))}
            <a className="text-link home-reveal reveal-delay-3 home-pick__link" href="#/menu">See the full menu <span className="text-link__arrow" /></a>
          </div>
          <div className="home-pick-pane" aria-hidden="true">
            {picks.map((pick, index) => (
              <div className={`home-pick-frame${active === index ? ' is-active' : ''}`} key={pick.name}>
                <PhotoFrame caption={`Photograph — ${pick.name}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const storyMoments = [
  { caption: 'Photograph — the bakehaus at 5am', text: 'The ovens are on before the lights are. Everything that reaches the counter was made a few metres behind it.' },
  { caption: 'Photograph — a hand shaping dough', text: 'Seven notes run through the food, the coffee and the room. They are on the packaging because they started in the kitchen.' },
  { caption: 'Photograph — the room filling', text: 'By nine the corner tables are taken by the same people they were taken by yesterday.' },
];

export function StorySection() {
  return (
    <section className="home-section on-dark">
      <div className="home-wrap home-story">
        <div className="home-story__heading"><h2 className="dsp dsp-1 home-reveal">Rooted in craftsmanship. Guided by simplicity.</h2></div>
        <div className="home-story__moments">
          {storyMoments.map((moment, index) => (
            <article className="home-reveal" key={moment.caption}>
              <div className="home-story__photo"><PhotoFrame caption={moment.caption} dark /></div>
              <p className="body">{moment.text}</p>
              {index === storyMoments.length - 1 && <a className="text-link" href="#/story">Read the full story <span className="text-link__arrow" /></a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DaySection() {
  return (
    <section className="home-section">
      <div className="home-wrap">
        <p className="lbl home-reveal">A day at SEVN</p>
        <div className="home-day">
          {dayAtSevn.map(([time, moment], index) => (
            <article className={`home-day__item home-reveal reveal-delay-${(index % 3) + 1}`} key={time}>
              <div className={`home-day__photo home-day__photo-${index + 1}`}>
                <PhotoFrame caption={`Photograph — ${moment.toLowerCase().replace(/\.$/, '')}`} />
              </div>
              <p className="home-day__caption"><b>{time}</b>{moment}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NotesSection({ sectionRef, activeNote }: { sectionRef: RefObject<HTMLElement | null>; activeNote: number }) {
  const note = notes[activeNote];
  return (
    <section className="home-notes on-dark" ref={sectionRef} aria-label="The seven notes">
      <div className="home-notes__sticky" aria-live="polite">
        {note && <div className="home-notes__stamp"><NoteStamp note={note} spin /></div>}
        <p className="home-notes__word">{note?.word ?? 'SEVN NOTES. ONE PLACE.'}</p>
      </div>
    </section>
  );
}

export function JournalSection() {
  const [lead, ...stories] = journalEntries;
  return (
    <section className="home-section">
      <div className="home-wrap">
        <p className="lbl home-reveal">From the journal</p>
        <div className="home-journal">
          <a className="home-journal__lead home-reveal" href="#/journal">
            <div className="home-journal__lead-photo"><PhotoFrame caption="Photograph — lead story" /></div>
            <span className="lbl">{lead.category} · {lead.date}</span>
            <h3 className="dsp dsp-2">{lead.title}</h3>
          </a>
          <div className="home-journal__stories">
            {stories.map((story, index) => (
              <a className={`home-journal__story home-reveal reveal-delay-${index + 1}`} href="#/journal" key={story.title}>
                <span className="lbl">{story.category} · {story.date}</span>
                <span className="home-journal__title">{story.title}</span>
                <span className="home-journal__read">{story.read} read</span>
              </a>
            ))}
            <a className="text-link home-reveal reveal-delay-2" href="#/journal">All stories <span className="text-link__arrow" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VisitSection() {
  const open = isOpenNow();
  const today = visit.hours[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1][1];
  return (
    <section className="home-visit on-dark">
      <div className="home-visit__info">
        <p className="lbl home-reveal">Visit</p>
        <h2 className="dsp dsp-2 home-reveal reveal-delay-1">Come for the coffee. Stay for the hour after it.</h2>
        <p className="body home-reveal reveal-delay-2">{visit.address.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p>
        <p className="home-open home-reveal reveal-delay-2"><i className={open ? 'is-open' : ''} />{open ? 'Open now' : 'Closed'} · Today {today}</p>
        <div className="home-visit__links home-reveal reveal-delay-3">
          <a className="text-link" href="#/visit">Get directions <span className="text-link__arrow" /></a>
          <a className="text-link" href="#/book">Book a table <span className="text-link__arrow" /></a>
        </div>
      </div>
      <div className="home-visit__photo"><PhotoFrame caption="Photograph — the frontage at dusk, blade sign lit" dark /></div>
    </section>
  );
}
