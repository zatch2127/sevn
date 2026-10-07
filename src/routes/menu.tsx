import { createFileRoute } from "@tanstack/react-router";
import { MenuPage } from "@/components/sevn/pages";
import { pageHead } from "@/components/sevn/site";
export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): { note?: string } => ({
    note: typeof search.note === "string" ? search.note : undefined,
  }),
  head: () => pageHead("The menu", "Discover SEVN coffee, signatures, fresh pastries, sourdough and sweets."),
  component: MenuRoute,
});

function MenuRoute() {
  return <MenuPage initialNote={Route.useSearch().note} />;
}
