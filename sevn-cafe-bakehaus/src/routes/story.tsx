import { createFileRoute } from "@tanstack/react-router";
import { CafeSite, pageHead } from "@/components/sevn/site";
import { StoryContent } from "@/components/sevn/page-content";

export const Route = createFileRoute("/story")({
  head: () => pageHead("Our Story", "Seven notes, one ritual: the craft, people and philosophy behind SEVN."),
  component: Page,
});
function Page() { return <CafeSite><StoryContent /></CafeSite>; }
