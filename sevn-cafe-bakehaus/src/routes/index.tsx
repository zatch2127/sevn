import { createFileRoute } from "@tanstack/react-router";
import { CafeSite, pageHead } from "@/components/sevn/site";
import { HomeContent } from "@/components/sevn/page-content";

export const Route = createFileRoute("/")({
  head: () => pageHead("Elevating everyday moments", "Refined coffee, hand-folded pastries and everyday rituals at SEVN in Bandra West, Mumbai."),
  component: Page,
});
function Page() { return <CafeSite><HomeContent /></CafeSite>; }
