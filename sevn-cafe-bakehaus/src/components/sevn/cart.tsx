import { createContext, useContext, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, X, ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, type Product } from "./products";

type CartItem = { product: Product; quantity: number };
type CartState = {
  items: CartItem[]; count: number; total: number;
  add: (product: Product) => void;
  change: (id: string, delta: number) => void;
  remove: (id: string) => void;
};
const CartContext = createContext<CartState | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (product: Product) => setItems(current => current.some(item => item.product.id === product.id)
    ? current.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
    : [...current, { product, quantity: 1 }]);
  const change = (id: string, delta: number) => setItems(current => current.map(item => item.product.id === id ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0));
  const remove = (id: string) => setItems(current => current.filter(item => item.product.id !== id));
  return <CartContext.Provider value={{ items, add, change, remove, count: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.quantity * item.product.price, 0) }}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart provider is required");
  return context;
}
export function CartPanel({ close }: { close: () => void }) {
  const { items, count, total, change, remove } = useCart();
  const [review, setReview] = useState(false);
  return <div className="cart-overlay" onClick={close}><section role="dialog" aria-modal="true" aria-label={review ? "Checkout" : "Your bag"} className="cart-drawer" onClick={event => event.stopPropagation()}>
    <div className="cart-heading"><div><p className="eyebrow">SEVN Café & Bakehaus</p><h2>{review ? "Checkout" : "Your bag"} <span>({count})</span></h2></div><Button variant="reference" size="icon" aria-label="Close cart" onClick={close}><X /></Button></div>
    {review ? <><div className="cart-items checkout-review"><Button variant="reference" className="checkout-back" onClick={() => setReview(false)}><ArrowLeft size={16} /> Back to bag</Button><p className="eyebrow">Order summary</p>{items.map(({product,quantity}) => <article className="cart-item" key={product.id}><img src={product.image} alt={product.name} /><div className="cart-item-details"><h3>{product.name}</h3><p>{quantity} × {formatPrice(product.price)}</p></div><strong className="price">{formatPrice(product.price * quantity)}</strong></article>)}<div className="checkout-unavailable"><LockKeyhole size={24} /><h3>Online orders coming soon</h3><p>Payments and order placement are not available yet. No payment has been taken and no order has been placed.</p></div></div><div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><Button variant="reference" className="btn btn-dark" onClick={() => setReview(false)}><ArrowLeft size={16} /> Back to bag</Button></div></> : <>
    {items.length === 0 ? <div className="cart-empty"><ShoppingBag size={48} strokeWidth={1} /><h3>Your bag is empty.</h3><p>A cup, a crumb, a little something to share.</p><Button variant="reference" asChild className="btn btn-dark"><Link to="/shop" onClick={close}>Explore the shop</Link></Button></div> : <>
      <div className="cart-items">{items.map(({ product, quantity }) => <article className="cart-item" key={product.id}>
        <img src={product.image} alt={product.name} /><div className="cart-item-details"><h3>{product.name}</h3><p>{formatPrice(product.price)}</p><div className="quantity-control"><Button variant="reference" size="icon" aria-label={`Decrease ${product.name}`} onClick={() => change(product.id, -1)}><Minus size={14} /></Button><span aria-label={`${product.name} quantity`}>{quantity}</span><Button variant="reference" size="icon" aria-label={`Increase ${product.name}`} onClick={() => change(product.id, 1)}><Plus size={14} /></Button></div></div>
        <div className="cart-item-end"><strong>{formatPrice(product.price * quantity)}</strong><Button variant="reference" size="icon" aria-label={`Remove ${product.name}`} onClick={() => remove(product.id)}><Trash2 size={16} /></Button></div>
      </article>)}</div>
      <div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><p>Your bag clears on refresh. Online payment is not available yet.</p><Button variant="reference" className="btn btn-dark" onClick={() => setReview(true)}>Checkout <ArrowRight size={16} /></Button><Button variant="reference" asChild className="cart-continue"><Link to="/shop" onClick={close}>Continue shopping</Link></Button></div>
    </>}
    </>}
  </section></div>;
}