import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReferenceHeader, ReferenceFooter } from "./reference-content";
import { CartPanel } from "./cart";

const moods = [
  ["Quiet Morning Ritual", "A first pour, slow light, nothing rushed."],
  ["Bold Opening Ritual", "Double shot, bright crema, a day that begins loud."],
  ["Golden Layers in Rhythm", "Laminated dough, folded eighty-one times."],
  ["Fresh Layers in Balance", "Sourdough, seasonal greens, quiet acidity."],
  ["Soft Crumbs, Sweet Finish", "Brioche doughnuts dusted to order."],
  ["Stack Bold & Balanced Right", "Boxes built for sharing across the table."],
  ["Deep Notes, Slow Melts", "Single-origin capsules and dark chocolate."],
];
const searchItems = [
  { name: "Our Menu", to: "/menu" }, { name: "Book a Table", to: "/book" },
  { name: "Our Story", to: "/story" }, { name: "Visit & Opening Hours", to: "/visit" },
  { name: "Journal", to: "/journal" }, { name: "Franchise", to: "/franchise" }, { name: "Shop", to: "/shop" },
] as const;

export function pageHead(title: string, description: string) {
  return { meta: [
    { title: `${title} | SEVN Café & Bakehaus` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | SEVN Café & Bakehaus` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] };
}

export function CafeSite({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<"search" | "cart" | "mobile" | null>(null);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    root.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    const header = root.querySelector(".site-header");
    const onScroll = () => {
      header?.classList.toggle("is-solid", window.scrollY > 60 || window.location.pathname !== "/");
      const sequence = root.querySelector<HTMLElement>(".notes-seq");
      if (sequence) {
        const position = Math.max(0, -sequence.getBoundingClientRect().top);
        const available = sequence.offsetHeight - window.innerHeight;
        const index = Math.min(6, Math.floor(position / Math.max(1, available) * 7));
        sequence.querySelectorAll(".notes-bg").forEach((el, i) => el.classList.toggle("show", i === index));
        sequence.querySelectorAll(".notes-dots span").forEach((el, i) => el.classList.toggle("on", i === index));
        const title = sequence.querySelector(".notes-title");
        const subtitle = sequence.querySelector(".notes-content > p:not(.eyebrow)");
        if (title) title.textContent = moods[index]?.[0] ?? "";
        if (subtitle) subtitle.textContent = moods[index]?.[1] ?? "";
        const eyebrow = sequence.querySelector(".eyebrow");
        if (eyebrow) eyebrow.textContent = `The seven notes · 0${index + 1} / 07`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setPanel(null); };
    window.addEventListener("keydown", onKey);
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest("button");
    if (!button) return;
    if (button.matches(".pages-trigger")) {
      const expanded = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(expanded));
      ref.current?.querySelector(".header-dropdown")?.classList.toggle("open", expanded);
    }
    if (button.getAttribute("aria-label") === "Search SEVN") setPanel("search");
    if (button.matches(".header-cart")) setPanel("cart");
    if (button.matches(".menu-toggle")) setPanel("mobile");
    if (button.closest(".mood-list")) {
      const buttons = Array.from(ref.current?.querySelectorAll(".mood-list button") ?? []);
      const index = buttons.indexOf(button);
      buttons.forEach((el, i) => { el.classList.toggle("active", i === index); el.setAttribute("aria-pressed", String(i === index)); });
      ref.current?.querySelectorAll(".mood-frame img").forEach((el, i) => el.classList.toggle("show", i === index));
      const title = ref.current?.querySelector(".mood-caption h3");
      const subtitle = ref.current?.querySelector(".mood-caption p");
      if (title) title.textContent = moods[index]?.[0] ?? "";
      if (subtitle) subtitle.textContent = moods[index]?.[1] ?? "";
      const stamp = ref.current?.querySelector(".mood-stamp .stamp-text textPath");
      if (stamp) stamp.textContent = `${moods[index]?.[0]?.toUpperCase() ?? ""} · SEVN ·`;
    }
    if (button.getAttribute("role") === "tab") {
      const category = button.textContent?.trim().toLowerCase() ?? "all";
      button.parentElement?.querySelectorAll("button").forEach(el => {
        el.classList.toggle("active", el === button); el.setAttribute("aria-selected", String(el === button));
      });
      ref.current?.querySelectorAll(".lead-post,.post-card").forEach(el => {
        const meta = el.querySelector(".meta")?.textContent?.toLowerCase() ?? "";
        el.classList.toggle("filter-hidden", category !== "all" && !meta.startsWith(category));
        el.classList.add("in");
      });
    }
    if (button.closest(".newsletter") || button.textContent?.trim() === "Join") {
      event.preventDefault();
      const input = button.parentElement?.querySelector<HTMLInputElement>("input");
      if (input && !input.checkValidity()) { input.reportValidity(); return; }
      setNotice("Newsletter registration is not connected yet. Contact hello@sevn.cafe to stay in touch.");
    }
    if (window.location.pathname === "/franchise" && button.textContent?.trim() === "Continue") {
      const form = button.closest(".inquiry-card") ?? button.closest("section");
      const fields = Array.from(form?.querySelectorAll<HTMLInputElement>("input") ?? []);
      if (fields.some(input => !input.reportValidity())) return;
      setNotice("To start the conversation, email your details to hello@sevn.cafe.");
    }
  }

  return <div ref={ref} onClick={handleClick}>
    <ReferenceHeader />
    {children}
    <ReferenceFooter />
    {panel === "cart" && <CartPanel close={() => setPanel(null)} />}
    {((panel && panel !== "cart") || notice) && <div className="reference-dialog" onClick={() => { setPanel(null); setNotice(""); }}>
      <div className="reference-dialog-inner" role="dialog" aria-modal="true" aria-label={notice ? "SEVN update" : panel === "search" ? "Search SEVN" : "Navigation"} onClick={e => e.stopPropagation()}>
        <Button variant="reference" size="icon" className="dialog-close" aria-label="Close" onClick={() => { setPanel(null); setNotice(""); }}><X /></Button>
        {notice ? <><h2>Stay in touch</h2><p className="reference-notice">{notice}</p><a href="mailto:hello@sevn.cafe" className="link-arrow">hello@sevn.cafe</a></> : panel === "search" ? <>
          <h2>Search SEVN</h2><input autoFocus type="search" aria-label="Search" placeholder="What are you looking for?" value={query} onChange={e => setQuery(e.target.value)} />
          <div className="search-results">{searchItems.filter(i => i.name.toLowerCase().includes(query.toLowerCase())).map(i => <Link key={i.to} to={i.to} onClick={() => setPanel(null)}><Search size={16} /> {i.name}</Link>)}
          {!searchItems.some(i => i.name.toLowerCase().includes(query.toLowerCase())) && <p>No results for “{query}”.</p>}</div>
        </> : <><h2>SEVN</h2><div className="search-results"><Link to="/" onClick={() => setPanel(null)}>Home</Link>{searchItems.map(i => <Link key={i.to} to={i.to} onClick={() => setPanel(null)}>{i.name}</Link>)}</div></>}
      </div>
    </div>}
  </div>;
}