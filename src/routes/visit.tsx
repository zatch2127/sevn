import { createFileRoute } from "@tanstack/react-router";
import { VisitPage } from "@/components/sevn/pages";
import { pageHead } from "@/components/sevn/site";
export const Route = createFileRoute("/visit")({head:()=>pageHead("Visit SEVN","Find SEVN Café & Bakehaus in Bandra West, with opening hours and directions."),component:VisitPage});
