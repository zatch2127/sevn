import { createFileRoute } from "@tanstack/react-router";
import { MenuPage } from "@/components/sevn/pages";
import { pageHead } from "@/components/sevn/site";
export const Route = createFileRoute("/menu")({head:()=>pageHead("The menu","Discover SEVN coffee, signatures, fresh pastries, sourdough and sweets."),component:MenuPage});
