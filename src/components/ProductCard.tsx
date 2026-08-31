import type { Product } from "../types";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAdd: (product: Product) => void;
}

const categoryDotClass: Record<Product["category"], string> = {
  cafe: "product-card__dot--cafe",
  cha: "product-card__dot--cha",
  sobremesa: "product-card__dot--sobremesa",
};

export default function ProductCard({ product, quantityInCart, onAdd }: ProductCardProps) {
  return (
    <article className={`product-card${product.signature ? " product-card--signature" : ""}`}>
      {product.note && <p className="product-card__note">{product.note}</p>}
      <div className="product-card__head">
        <span className={`product-card__dot ${categoryDotClass[product.category]}`} aria-hidden="true" />
        <h3 className="product-card__name">{product.name}</h3>
      </div>
      <p className="product-card__desc">{product.description}</p>
      <div className="product-card__foot">
        <span className="product-card__price">R$ {product.price.toFixed(2)}</span>
        <button className="product-card__add" onClick={() => onAdd(product)}>
          {quantityInCart > 0 ? `Na sacola · ${quantityInCart}` : "Adicionar"}
        </button>
      </div>
    </article>
  );
}
