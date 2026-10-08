import { createFileRoute } from "@tanstack/react-router";
import { CafeSite, pageHead } from "@/components/sevn/site";
import { MenuContent } from "@/components/sevn/page-content";

export const Route = createFileRoute("/menu")({
  head: () => pageHead("Our Menu", "Explore SEVN coffee, signature lattes, pastries, sourdough and the bakehaus kitchen."),
  component: Page,
});
function Page() { return <CafeSite><MenuContent /></CafeSite>; }
