import { createFileRoute } from "@tanstack/react-router";
import { CafeSite, pageHead } from "@/components/sevn/site";
import { BookingPage } from "@/components/sevn/booking";

export const Route = createFileRoute("/book")({
  head: () => pageHead("Book a Table", "Plan your next morning coffee, slow brunch or gathering at SEVN Café & Bakehaus."),
  component: Page,
});
function Page() { return <CafeSite><BookingPage /></CafeSite>; }
