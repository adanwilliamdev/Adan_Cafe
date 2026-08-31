import { useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import type { CartItem, Product } from "./types";

export default function App() {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const handleAdd = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: {
          product,
          quantity: (existing?.quantity ?? 0) + 1,
        },
      };
    });
    setCartOpen(true);
  };

  const handleIncrease = (id: string) => {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
      return { ...prev, [id]: { ...item, quantity: item.quantity + 1 } };
    });
  };

  const handleDecrease = (id: string) => {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
      if (item.quantity <= 1) {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...item, quantity: item.quantity - 1 } };
    });
  };

  const items = useMemo(() => Object.values(cart), [cart]);
  const quantities = useMemo(() => {
    const map: Record<string, number> = {};
    items.forEach((item) => {
      map[item.product.id] = item.quantity;
    });
    return map;
  }, [items]);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <About />
        <Shop quantities={quantities} onAdd={handleAdd} />
      </main>
      <Footer />
      <Cart
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    </>
  );
}
