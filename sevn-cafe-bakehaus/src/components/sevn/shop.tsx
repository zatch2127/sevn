import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import collage from "@/assets/sevn-collage.jpg.asset.json";
import { products, formatPrice } from "./products";
import { useCart } from "./cart";

export function ShopContent() {
  const { add } = useCart();
  const [category, setCategory] = useState("All");
  const [lastAdded, setLastAdded] = useState("");
  const categories = ["All", ...new Set(products.map(product => product.category))];
  return <main><div className="bm-parallax shop-banner"><div className="bm-parallax-img"><img src={collage.url} alt="SEVN café packaging" /></div><div className="bm-parallax-inner"><h1>Our Shop</h1><p>Seven notes, one ritual — Bandra West</p></div></div>
    <section className="section container"><div className="section-title center"><p className="eyebrow">Café & Bakehaus</p><h2>A cup, a crumb, a box</h2><span className="title-rule" /></div>
      <div className="tabs" role="tablist" aria-label="Shop categories">{categories.map(name => <Button key={name} variant="reference" role="tab" aria-selected={category === name} className={category === name ? "active" : ""} onClick={() => setCategory(name)}>{name}</Button>)}</div>
      <p className="shop-feedback" role="status" aria-live="polite">{lastAdded ? `${lastAdded} added to your bag.` : ""}</p>
      <div className="shop-grid">{products.filter(product => category === "All" || category === product.category).map(product => <article className="shop-product" key={product.id}>
        <div className="pick-img"><img src={product.image} alt={product.name} loading="lazy" /></div><p className="eyebrow">{product.category}</p><div className="pick-body"><h3>{product.name}</h3><span className="price">{formatPrice(product.price)}</span></div><p className="shop-description">{product.description}</p>
        <Button variant="reference" className="btn btn-line" aria-label={`Add ${product.name} to cart`} onClick={() => { add(product); setLastAdded(product.name); }}>{lastAdded === product.name ? <Check size={16} /> : <Plus size={16} />} Add to cart</Button>
      </article>)}</div>
    </section>
  </main>;
}