import { useEffect } from 'react';
import Homepage from './Homepage';
import SevnPage from './SevnPage';
import LinksPage from './LinksPage';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const isSevnRoute = path === '/sevn';
  const isPackagingRoute = path === '/packaging';
  const isLinksRoute = path === '/links';

  useEffect(() => {
    document.title = isLinksRoute
      ? 'Project links — Terra Arc & SEVN'
      : isPackagingRoute
        ? 'SEVN — Packaging Presentation'
        : isSevnRoute
          ? 'SEVN — Café & Bakehaus'
          : 'Terra Arc — Coffee, considered.';
  }, [isLinksRoute, isPackagingRoute, isSevnRoute]);

  if (isLinksRoute) return <LinksPage />;
  if (isPackagingRoute) {
    return (
      <iframe
        className="packaging-route"
        src="/packaging/index.html"
        title="SEVN packaging presentation"
      />
    );
  }

  return isSevnRoute ? <SevnPage /> : <Homepage />;
}
