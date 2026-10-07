import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/sevn/pages";
import { pageHead } from "@/components/sevn/site";
export const Route = createFileRoute("/story")({head:()=>pageHead("Our story","Seven notes connect SEVN coffee, the bakehaus and thoughtful hospitality."),component:StoryPage});
