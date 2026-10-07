import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { SiteShell } from '@/components/sevn/site';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: CafeRoot,
});

function CafeRoot() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell>
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  );
}
