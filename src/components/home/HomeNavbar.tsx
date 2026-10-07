import { useEffect, useState } from 'react';
import { getTodayHours, navigation, visit } from './homeData';

function BrandMark({ withSubtitle = true }: { withSubtitle?: boolean }) {
  return (
    <span className="home-brand-mark">
      <span className="home-brand-mark__word">S</span>
      <span className="home-brand-mark__bars" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M3 5.6c6-.7 12-.7 18 0v2.1c-6-.6-12-.6-18 0z" />
          <path d="M4.4 11c5.1.7 10.1.7 15.2 0v2c-5.1-.6-10.1-.6-15.2 0z" />
          <path d="M3 16.3c6-.6 12-.6 18 0v2.1c-6-.7-12-.7-18 0z" />
        </svg>
      </span>
      <span className="home-brand-mark__word">VN</span>
      {withSubtitle && <span className="home-brand-mark__subtitle">Cafe &amp;<br />Bakehaus</span>}
    </span>
  );
}

export function HomeNavbar({ compact }: { compact: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const todayHours = getTodayHours();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle('home-menu-open', menuOpen);
    return () => document.body.classList.remove('home-menu-open');
  }, [menuOpen]);

  return (
    <>
      <header className={`home-nav${compact ? ' is-compact' : ''}${menuOpen ? ' is-open' : ''}`}>
        <a className="home-nav__brand" href="#/home" aria-label="SEVN, home" onClick={closeMenu}><BrandMark /></a>
        <nav className="home-nav__links" aria-label="Main navigation">
          {navigation.map(item => (
            <a className="home-nav__link" href={`#/${item.route}`} key={item.route}>
              {item.label}<svg viewBox="0 0 60 6" preserveAspectRatio="none" aria-hidden="true"><path d="M0 4 C15 -1 30 7 45 3S58 2 60 4" /></svg>
            </a>
          ))}
          <a className="home-nav__link is-secondary" href="#/franchise">Partner with SEVN
            <svg viewBox="0 0 60 6" preserveAspectRatio="none" aria-hidden="true"><path d="M0 4 C15 -1 30 7 45 3S58 2 60 4" /></svg>
          </a>
          <a className="home-nav__book" href="#/book">Book a table</a>
        </nav>
        <button className="home-nav__burger" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="home-mobile-menu" onClick={() => setMenuOpen(open => !open)}>
          <span /><span /><span />
        </button>
      </header>
      <nav className={`home-mobile-menu${menuOpen ? ' is-open' : ''}`} id="home-mobile-menu" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        {navigation.map(item => <a className="home-mobile-menu__link" href={`#/${item.route}`} key={item.route} onClick={closeMenu}>{item.label}</a>)}
        <a className="home-mobile-menu__link" href="#/book" onClick={closeMenu}>Book a table</a>
        <div className="home-mobile-menu__footer">
          <a href="#/franchise" onClick={closeMenu}>Partner with SEVN</a>
          <p>Today {todayHours}</p>
          <a href={`tel:${visit.phone.replace(/\s/g, '')}`}>{visit.phone}</a>
          <a href="https://instagram.com/sevn.cafe" target="_blank" rel="noreferrer">{visit.instagram}</a>
        </div>
      </nav>
    </>
  );
}

export { BrandMark };
