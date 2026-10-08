import { createFileRoute } from "@tanstack/react-router";
import { CafeSite, pageHead } from "@/components/sevn/site";
import { FranchiseContent } from "@/components/sevn/page-content";

export const Route = createFileRoute("/franchise")({
  head: () => pageHead("Partner with SEVN", "Explore the SEVN partnership philosophy and the roadmap to opening a bakehaus."),
  component: Page,
});
function Page() { return <CafeSite><FranchiseContent /></CafeSite>; }
