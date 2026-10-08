import { createFileRoute } from "@tanstack/react-router";
import { CafeSite, pageHead } from "@/components/sevn/site";
import { ShopContent } from "@/components/sevn/shop";

export const Route = createFileRoute("/shop")({
  head: () => pageHead("Our Shop", "Browse SEVN coffee, pastries, sourdough, kitchen favourites and sweets, and compose your bag."),
  component: ShopPage,
});
function ShopPage() { return <CafeSite><ShopContent /></CafeSite>; }