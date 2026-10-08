import { useEffect } from 'react';
import Homepage from './Homepage';
import SevnPage from './SevnPage';
import LinksPage from './LinksPage';
import NotFoundPage from './NotFoundPage';
import CafeBakehausRoute from './CafeBakehausRoute';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const isHomeRoute = path === '/';
  const isSevnRoute = path === '/sevn';
  const isCafeBakehausRoute = path === '/cafe-bakehaus';
  const isPackagingRoute = path === '/packaging';
  const isLinksRoute = path === '/links';
  const isKnownRoute = isHomeRoute || isSevnRoute || isCafeBakehausRoute || isPackagingRoute || isLinksRoute;

  useEffect(() => {
    document.title = isLinksRoute
      ? 'Project links — Terra Arc & SEVN'
      : isPackagingRoute
        ? 'SEVN Animation — Interactive Preview'
        : isCafeBakehausRoute
          ? 'SEVN Café & Bakehaus'
          : isSevnRoute
            ? 'SEVN — Café & Bakehaus'
            : isHomeRoute
              ? 'Terra Arc — Coffee, considered.'
              : 'Page not found — Terra Arc & SEVN';
  }, [path]);

  if (isLinksRoute) return <LinksPage />;
  if (!isKnownRoute) return <NotFoundPage />;
  if (isCafeBakehausRoute) return <CafeBakehausRoute />;
  if (isPackagingRoute) {
    return (
      <iframe
        className="packaging-route"
        src="/packaging/index.html"
        title="SEVN animation presentation"
      />
    );
  }

  return isSevnRoute ? <SevnPage /> : <Homepage />;
}
