import './styles/links.css';

const projects = [
  {
    number: '01',
    title: 'Terra Arc',
    type: 'Main homepage',
    description: 'The cinematic coffee experience currently served at the project root.',
    href: '/',
    path: '/',
    theme: 'terra',
  },
  {
    number: '02',
    title: 'SEVN Café',
    type: 'Full café website',
    description: 'The ZIP project merge: homepage, menu, story, journal, visit, booking and franchise pages.',
    href: '/cafe/',
    path: '/cafe/',
    theme: 'cafe',
  },
  {
    number: '03',
    title: 'SEVN Packaging',
    type: 'Packaging presentation',
    description: 'The responsive packaging concept with scroll scenes, product mockups and interactive previews.',
    href: '/packaging',
    path: '/packaging',
    theme: 'packaging',
  },
  {
    number: '04',
    title: 'SEVN Home Concept',
    type: 'Alternate homepage',
    description: 'An earlier SEVN homepage concept kept available for comparison.',
    href: '/sevn',
    path: '/sevn',
    theme: 'sevn',
  },
];

const cafePages = [
  { label: 'Home', route: '/' },
  { label: 'Menu', route: '/menu' },
  { label: 'Our story', route: '/story' },
  { label: 'Journal', route: '/journal' },
  { label: 'Visit', route: '/visit' },
  { label: 'Book a table', route: '/book' },
  { label: 'Franchise', route: '/franchise' },
];

export default function LinksPage() {
  return (
    <main className="links-directory">
      <div className="links-directory__top">
        <a className="links-directory__brand" href="/" aria-label="Terra Arc home">TERRA <span>ARC</span></a>
        <span className="links-directory__eyebrow">Project directory · 2026</span>
      </div>

      <header className="links-directory__intro">
        <p className="links-directory__eyebrow">Choose a preview</p>
        <h1>One project.<br /><em>Different directions.</em></h1>
        <p className="links-directory__lead">
          A quick guide to the available website previews, what each one is for, and where to find its pages.
        </p>
      </header>

      <section className="links-directory__projects" aria-label="Project previews">
        {projects.map(project => (
          <article className={`directory-card directory-card--${project.theme}`} key={project.path}>
            <div className="directory-card__meta">
              <span>{project.number} / PREVIEW</span>
              <span>{project.type}</span>
            </div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="directory-card__bottom">
              <code>{project.path}</code>
              <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                Open preview <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="links-directory__cafe" aria-labelledby="cafe-pages-heading">
        <div>
          <p className="links-directory__eyebrow">Inside the full café website</p>
          <h2 id="cafe-pages-heading">SEVN Café pages</h2>
          <p>These routes open within the café site. The address starts with <code>/cafe/#</code>.</p>
        </div>
        <nav aria-label="SEVN Café pages">
          {cafePages.map(page => (
            <a href={`/cafe/#${page.route}`} key={page.route}>
              <span>{page.label}</span>
              <code>/cafe/#{page.route}</code>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </section>

      <footer className="links-directory__footer">
        <span>Use this directory to share the right preview with your team.</span>
        <a href="/">Back to Terra Arc <span aria-hidden="true">↑</span></a>
      </footer>
    </main>
  );
}
