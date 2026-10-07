import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { data, decode, bakery, PageCover } from './site';
import { itemPhotos } from './product-photos';

function EditorialMenuRow({ item }: { item: typeof data.menu[number]['items'][number] }) {
  const [expanded, setExpanded] = useState(false);
  const photo = itemPhotos[item.n];
  const name = decode(item.n);
  return (
    <article className={`editorial-menu-row ${photo ? 'has-photo' : ''} ${expanded ? 'is-expanded' : ''}`}>
      <div className="editorial-menu-line">
        {photo && <Button variant="tool" className="menu-photo-toggle" aria-label={`${expanded ? 'Close' : 'View'} ${name} photo`} aria-expanded={expanded} aria-controls={`photo-${item.n.replaceAll(' ', '-')}`} onClick={() => setExpanded(value => !value)}>
          <img src={photo.src} alt="" width="80" height="80" loading="lazy" />
          <span className="menu-photo-icon">{expanded ? <X /> : <ArrowUpRight />}</span>
        </Button>}
        <div className="editorial-menu-copy">
          <div className="menu-top"><h3>{name}</h3><span className="dots" /><span className="price">${item.p}</span></div>
          <p>{decode(item.d)} <span className="menu-diet">{item.m.includes('vg') ? '○' : item.m.includes('v') ? '●' : ''} {item.m.includes('n') ? '▢' : ''}</span></p>
        </div>
      </div>
      {photo && <figure className="menu-photo-detail" id={`photo-${item.n.replaceAll(' ', '-')}`}>
        <div className="menu-photo-frame"><img src={photo.src} alt={photo.alt} width="320" height="220" loading="lazy" /><span className="menu-photo-panel" aria-hidden="true" /></div>
        <figcaption><span>{name}</span><span>{decode(item.d)}</span><span>Illustrative image</span></figcaption>
      </figure>}
    </article>
  );
}

export function MenuPage() {
  const [category, setCategory] = useState('all');
  return <>
    <PageCover title="The menu." label="Seven notes. One counter." image={bakery} />
    <section className="section editorial-menu">
      <div className="container">
        <div className="menu-introduction"><p className="eyebrow">A few things worth ordering</p><h2>Made with care.<br /><em>Served with warmth.</em></h2><p className="menu-legend">● Vegetarian &nbsp; ○ Vegan &nbsp; ▢ Contains nuts</p></div>
        <div className="menu-composition">
          <nav className="menu-index" aria-label="Menu categories">
            <Button variant="tab" aria-pressed={category === 'all'} onClick={() => setCategory('all')}><span className="menu-index-number">—</span><span>All notes</span><ArrowUpRight /></Button>
            {data.menu.map((c, i) => <Button variant="tab" key={c.id} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}><span className="menu-index-number">0{i + 1}</span><span>{decode(c.title)}</span><ArrowUpRight /></Button>)}
          </nav>
          <div className="menu-sections">
            {data.menu.filter(c => category === 'all' || c.id === category).map((c) => {
              const note = data.notes.find(n => n.id === c.note);
              return <section className="menu-category" key={c.id} aria-label={decode(c.title)}>
                <header className="menu-category-heading"><h2>{decode(c.title)}</h2>{note && <span className="eyebrow">{decode(note.word)}</span>}</header>
                <div className="editorial-menu-items">{c.items.map(item => <EditorialMenuRow key={item.n} item={item} />)}</div>
              </section>;
            })}
          </div>
        </div>
      </div>
    </section>
  </>;
}