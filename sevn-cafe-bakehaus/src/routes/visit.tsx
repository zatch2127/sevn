import { createFileRoute } from "@tanstack/react-router";
import { CafeSite, pageHead } from "@/components/sevn/site";
import { VisitContent } from "@/components/sevn/page-content";

export const Route = createFileRoute("/visit")({
  head: () => pageHead("Visit SEVN", "Find SEVN on Linking Road, Bandra West, Mumbai, with opening hours and café amenities."),
  component: Page,
});
function Page() { return <CafeSite><VisitContent /></CafeSite>; }
