import { createFileRoute } from "@tanstack/react-router";
import { JournalPage } from "@/components/sevn/pages";
import { pageHead } from "@/components/sevn/site";
export const Route = createFileRoute("/journal/")({head:()=>pageHead("Journal","Notes from the SEVN bakehaus: coffee, baking and everyday rituals."),component:JournalPage});
