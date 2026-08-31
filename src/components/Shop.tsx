import { useState } from "react";
import { products, categoryLabels } from "../data/products";
import type { Category, Product } from "../types";
import ProductCard from "./ProductCard";
import "./Shop.css";

interface ShopProps {
  quantities: Record<string, number>;
  onAdd: (product: Product) => void;
}

const categories: Category[] = ["cafe", "cha", "sobremesa"];

export default function Shop({ quantities, onAdd }: ShopProps) {
  const [active, setActive] = useState<Category>("cafe");

  const visible = products.filter((p) => p.category === active);

  return (
    <section className="shop" id="loja">
      <div className="shop__head">
        <h2 className="shop__title">A loja</h2>
        <p className="shop__subtitle">
          Café para levar, chás para preparar em casa e sobremesas para hoje.
        </p>
      </div>

      <div className="shop__tabs" role="tablist" aria-label="Categorias da loja">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            className={`shop__tab${active === cat ? " shop__tab--active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="shop__grid">
        {visible.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantityInCart={quantities[product.id] ?? 0}
            onAdd={onAdd}
          />
        ))}
      </div>
    </section>
  );
}
