import { useEffect, useRef, useState } from 'react';
import { HomeFooter } from '@/components/home/HomeFooter';
import { HomeNavbar } from '@/components/home/HomeNavbar';
import {
  DaySection,
  HeroSection,
  JournalSection,
  MoodSection,
  NotesSection,
  PicksSection,
  StorySection,
  VisitSection,
} from '@/components/home/HomeSections';
import { notes } from '@/components/home/homeData';
import './styles/home.css';

export default function SevnPage() {
  const page = useRef<HTMLElement>(null);
  const notesSection = useRef<HTMLElement>(null);
  const flowPath = useRef<SVGPathElement>(null);
  const [compact, setCompact] = useState(false);
  const [activeNote, setActiveNote] = useState(0);

  useEffect(() => {
    const root = page.current;
    const path = flowPath.current;
    if (!root || !path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    document.body.classList.add('sevn-page');

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    );
    root.querySelectorAll('.home-reveal').forEach(element => revealObserver.observe(element));

    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
        path.style.strokeDashoffset = `${pathLength * (1 - progress)}`;
        setCompact(window.scrollY > window.innerHeight * 0.8);

        const darkSections = root.querySelectorAll<HTMLElement>('.on-dark');
        const center = window.innerHeight / 2;
        const onDark = Array.from(darkSections).some(section => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= center && bounds.bottom >= center;
        });
        document.body.classList.toggle('dark-rail', onDark);

        const section = notesSection.current;
        if (section) {
          const bounds = section.getBoundingClientRect();
          const travel = section.offsetHeight - window.innerHeight;
          const noteProgress = travel > 0 ? Math.min(0.999, Math.max(0, -bounds.top / travel)) : 0;
          const nextNote = Math.min(notes.length, Math.floor(noteProgress * (notes.length + 1)));
          setActiveNote(current => current === nextNote ? current : nextNote);
        }
      });
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    return () => {
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      document.body.classList.remove('dark-rail');
      document.body.classList.remove('sevn-page');
    };
  }, []);

  return (
    <main className="sevn-home" ref={page}>
      <svg className="home-flow" viewBox="0 0 46 1000" preserveAspectRatio="none" aria-hidden="true">
        <path
          ref={flowPath}
          d="M23 0 C 6 62, 40 124, 23 186 C 6 248, 40 310, 23 372 C 6 434, 40 496, 23 558 C 6 620, 40 682, 23 744 C 6 806, 40 868, 23 930 C 12 968, 20 984, 23 1000"
        />
      </svg>
      <HomeNavbar compact={compact} />
      <HeroSection />
      <section className="home-band on-dark">
        <div className="home-wrap">
          <p className="dsp dsp-1 home-reveal">A flowing experience.</p>
        </div>
      </section>
      <MoodSection />
      <PicksSection />
      <StorySection />
      <DaySection />
      <NotesSection sectionRef={notesSection} activeNote={activeNote} />
      <JournalSection />
      <VisitSection />
      <HomeFooter />
    </main>
  );
}
