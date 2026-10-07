import './styles/not-found.css';

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <a className="not-found__brand" href="/">TERRA <span>ARC</span></a>
      <div className="not-found__content">
        <p>404 · PAGE NOT FOUND</p>
        <h1>This page<br /><em>is off the map.</em></h1>
        <span>The link may have changed, or the address may not exist.</span>
        <nav aria-label="Helpful destinations">
          <a href="/">Terra Arc home</a>
          <a href="/links">Browse all project links</a>
          <a href="/cafe/">SEVN Café</a>
        </nav>
      </div>
    </main>
  );
}
