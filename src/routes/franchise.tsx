import { createFileRoute } from "@tanstack/react-router";
import { FranchisePage } from "@/components/sevn/pages";
import { pageHead } from "@/components/sevn/site";
export const Route = createFileRoute("/franchise")({head:()=>pageHead("Partner with SEVN","Start a conversation about bringing SEVN Café & Bakehaus to your city."),component:FranchisePage});
