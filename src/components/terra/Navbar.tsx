import { useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { chapters } from '@/lib/chapters';
import { goToChapter } from '@/animations/film';

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="site-header">
      <Button variant="ghost" className="wordmark" aria-label="Back to start" onClick={() => { goToChapter(0); setOpen(false); }}>terra <i>arc</i></Button>
      <nav className={open ? 'is-open' : ''} aria-label="Experience chapters" id="chapter-navigation">
        {chapters.map((chapter, index) => <Button variant="ghost" key={chapter.number} onClick={() => { goToChapter(index); setOpen(false); }}><small>{chapter.number}</small>{chapter.name}</Button>)}
      </nav>
      <Button variant="ghost" className="menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="chapter-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </header>
    <Button variant="ghost" className="contact-link" disabled title="Contact is outside this homepage recreation">Contact <Mail size={15} /></Button>
  </>;
}