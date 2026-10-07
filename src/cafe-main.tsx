import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { getCafeRouter } from './cafe-router';
import './cafe.css';

const root = document.getElementById('cafe-root');

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <RouterProvider router={getCafeRouter()} />
    </React.StrictMode>,
  );
}
