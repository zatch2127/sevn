import { createFileRoute } from "@tanstack/react-router";
import { HomePage, pageHead } from "@/components/sevn/site";
export const Route = createFileRoute("/")({ head: () => pageHead("Elevating everyday moments", "SEVN Café & Bakehaus. Discover handcrafted coffee, fresh pastries and a place to slow down in Bandra West."), component: HomePage });
