import { QueryClient } from '@tanstack/react-query';
import { createHashHistory, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function getCafeRouter() {
  const queryClient = new QueryClient();

  return createRouter({
    routeTree,
    history: createHashHistory(),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getCafeRouter>;
  }
}
