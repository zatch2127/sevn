import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import './story-flow.css';

const chapters = [
  {
    label: '01 / Before the first pour',
    title: 'The ovens are on before the lights are.',
    text: 'Everything that reaches the counter was made a few metres behind it. It is a small distance, and it makes all the difference.',
  },
  {
    label: '02 / Made with intention',
    title: 'Seven notes run through everything.',
    text: 'The food, the coffee and the room are part of the same thought. The notes are on the packaging because they started in the kitchen.',
  },
  {
    label: '03 / A place to return to',
    title: 'The corner tables have regulars.',
    text: 'By nine, the same people have found their usual seats. We saved you a place, too.',
  },
];

const statementLines = ['Rooted in craftsmanship.', 'Guided by simplicity.'];

/* Splits text into words -> letters so each letter can rotate in 3D */
function SplitLetters({ text, startIndex }: { text: string; startIndex: number }) {
  let counter = startIndex;
  return (
    <>
      {text.split(' ').map((word, wordIndex, words) => (
        <span key={`${word}-${wordIndex}`}>
          <span className="story-flow__word" aria-hidden="true">
            {word.split('').map((letter, letterIndex) => {
              const style = { '--i': counter++ } as CSSProperties;
              return (
                <span className="story-flow__letter" style={style} key={letterIndex}>
                  {letter}
                </span>
              );
            })}
          </span>
          {wordIndex < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

export function StoryFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [statementReachedCenter, setStatementReachedCenter] = useState(false);
  const statementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const statement = statementRef.current;
    if (!statement) return;

    const statementObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStatementReachedCenter(true);
          statementObserver.disconnect();
        }
      },
      { rootMargin: '-47% 0px -47% 0px', threshold: 0 },
    );
    statementObserver.observe(statement);

    const observer = new IntersectionObserver(
      entries => {
        const activeEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (activeEntry?.target instanceof HTMLElement) {
          const index = Number(activeEntry.target.dataset.storyIndex);
          if (Number.isInteger(index)) setActiveIndex(index);
        }
      },
      { rootMargin: '-47% 0px -47% 0px', threshold: 0 },
    );

    document
      .querySelectorAll<HTMLElement>('[data-story-heading]')
      .forEach(heading => observer.observe(heading));

    return () => {
      statementObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  const firstLineLength = statementLines[0].replace(/ /g, '').length;

  return (
    <section
      className="story-flow"
      aria-labelledby="story-flow-title"
      data-active-story={activeIndex}
      style={{ '--story': activeIndex } as CSSProperties}
    >
      <div className="story-flow__layout container">
        <div className="story-flow__statement-column">
          <div className="story-flow__statement" data-center-reached={statementReachedCenter}>
            <p className="eyebrow">A little about us</p>
            <div className="story-flow__statement-motion">
              <h2
                id="story-flow-title"
                ref={statementRef}
                aria-label={statementLines.join(' ')}
              >
                <SplitLetters text={statementLines[0]} startIndex={0} />
                <br />
                <em>
                  <SplitLetters text={statementLines[1]} startIndex={firstLineLength} />
                </em>
              </h2>
            </div>
            <Link to="/story" className="story-flow__intro-link">
              Read the full story <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="story-flow__chapters">
          {chapters.map((chapter, index) => (
            <article
              className="story-flow__chapter"
              key={chapter.label}
              data-active={activeIndex === index}
              data-index={index}
            >
              <p className="eyebrow">{chapter.label}</p>
              <h3 data-story-heading data-story-index={index}>{chapter.title}</h3>
              <p>{chapter.text}</p>
              {index === chapters.length - 1 && (
                <Link to="/story" className="story-flow__chapter-link">
                  Read the full story <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}