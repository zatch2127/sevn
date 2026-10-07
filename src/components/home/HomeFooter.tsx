import { useState, type FormEvent } from 'react';
import { BrandMark } from './HomeNavbar';
import { getTodayHours, navigation, visit } from './homeData';

export function HomeFooter() {
  const [subscribed, setSubscribed] = useState(false);
  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="home-footer on-dark">
      <div className="home-wrap">
        <h2 className="dsp dsp-1 home-reveal">WHAT WOULD YOU COME BACK FOR?</h2>
        <div className="home-footer__columns">
          <div>
            {navigation.map(item => <a href={`#/${item.route}`} key={item.route}>{item.label}</a>)}
            <a href="#/book">Book a table</a>
            <p className="home-footer__muted">Today {getTodayHours()}</p>
          </div>
          <div>
            <a href="https://instagram.com/sevn.cafe" target="_blank" rel="noreferrer">{visit.instagram}</a>
            <a href={`mailto:${visit.email}`}>{visit.email}</a>
            <a href={`tel:${visit.phone.replace(/\s/g, '')}`}>{visit.phone}</a>
            {!subscribed ? (
              <form className="home-newsletter" onSubmit={submitNewsletter}>
                <label className="sr-only" htmlFor="home-newsletter-email">Your email</label>
                <input id="home-newsletter-email" type="email" placeholder="Your email" required />
                <button className="text-link" type="submit">Join <span className="text-link__arrow" /></button>
              </form>
            ) : <p className="home-newsletter__success" role="status">You're on the list. See you at seven.</p>}
          </div>
        </div>
        <div className="home-footer__franchise">
          <span>Interested in bringing SEVN to your city?</span>
          <a className="text-link" href="#/franchise">Franchise inquiries <span className="text-link__arrow" /></a>
        </div>
        <div className="home-footer__wordmark dsp" aria-label="SEVN"><BrandMark withSubtitle={false} /></div>
      </div>
    </footer>
  );
}
