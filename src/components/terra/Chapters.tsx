import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { chapters } from '@/lib/chapters';
import { goToChapter } from '@/animations/film';

export function Chapters() {
  return <>
    <section className="hero chapter" aria-label="Terra Arc introduction">
      <div className="hero__copy">
        <p className="eyebrow">Coffee, considered</p>
        <h1>The ritual,<br /><em>in motion.</em></h1>
        <p className="lede">Follow a bean from its first fracture to the table. Every second has a reason.</p>
        <Button variant="ghost" className="text-cta" onClick={() => goToChapter(1)}>Begin the pour <ArrowDownRight size={18} /></Button>
      </div>
      <div className="hero__mark" aria-hidden="true"><span>Est.</span><b>2026</b><span>Vancouver</span></div>
    </section>
    {chapters.map((chapter, index) => <section className={`chapter chapter--${index + 1}`} key={chapter.number} aria-label={chapter.name}>
      <div className="chapter__measure" aria-hidden="true"><span>{chapter.number}</span><svg viewBox="0 0 180 180"><circle cx="90" cy="90" r="72" /><path d="M38 132A72 72 0 0 1 142 48" /></svg></div>
      <div className="chapter__copy">
        <p className="eyebrow">{chapter.name}</p><h2>{chapter.title}</h2><p>{chapter.text}</p>
        {index === 2 && <div className="pressure-readout"><b>9.0</b><span>BAR / EXTRACTION PRESSURE</span></div>}
        {index === 4 && (
          <nav className="final-links" aria-label="Explore Terra Arc and SEVN">
            <a className="reserve-button" href="/cafe/">Visit SEVN Café <ArrowUpRight size={17} /></a>
            <a className="reserve-button" href="/cafe/#/book">Book a table <ArrowUpRight size={17} /></a>
            <a className="reserve-button" href="/packaging">SEVN Animation <ArrowUpRight size={17} /></a>
            <a className="final-links__directory" href="/links">Explore all project links <ArrowUpRight size={16} /></a>
          </nav>
        )}
      </div>
    </section>)}
  </>;
}