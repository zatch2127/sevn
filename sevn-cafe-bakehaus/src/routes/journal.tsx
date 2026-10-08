import { createFileRoute } from "@tanstack/react-router";
import { CafeSite, pageHead } from "@/components/sevn/site";
import { JournalContent } from "@/components/sevn/page-content";

export const Route = createFileRoute("/journal")({
  head: () => pageHead("Journal", "Notes on coffee, baking and the people behind SEVN Café & Bakehaus."),
  component: Page,
});
function Page() { return <CafeSite><JournalContent /></CafeSite>; }
