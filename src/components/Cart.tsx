import type { CartItem } from "../types";
import "./Cart.css";

interface CartProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export default function Cart({ open, items, onClose, onIncrease, onDecrease }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <div
        className={`cart-overlay${open ? " cart-overlay--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`cart${open ? " cart--open" : ""}`}
        role="dialog"
        aria-label="Sacola de compras"
        aria-hidden={!open}
      >
        <div className="cart__head">
          <h2>Sua sacola</h2>
          <button className="cart__close" onClick={onClose} aria-label="Fechar sacola">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart__empty">
            A sacola está vazia. Escolha algo no café, no chá ou nas sobremesas.
          </p>
        ) : (
          <ul className="cart__list">
            {items.map(({ product, quantity }) => (
              <li className="cart__item" key={product.id}>
                <div>
                  <p className="cart__item-name">{product.name}</p>
                  <p className="cart__item-price">R$ {product.price.toFixed(2)}</p>
                </div>
                <div className="cart__qty">
                  <button onClick={() => onDecrease(product.id)} aria-label={`Diminuir ${product.name}`}>
                    −
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => onIncrease(product.id)} aria-label={`Aumentar ${product.name}`}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart__footer">
          <div className="cart__total">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <button className="cart__checkout" disabled={items.length === 0}>
            Fechar pedido
          </button>
        </div>
      </aside>
    </>
  );
}
