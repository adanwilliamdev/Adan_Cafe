import { useEffect, useRef } from 'react'
import { useCart } from '../../context/CartContext'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import styles from './CartDrawer.module.css'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, totalPrice, incrementItem, decrementItem, removeItem } = useCart()
  const drawerRef = useRef<HTMLDivElement>(null)

  useFocusTrap(drawerRef, open, onClose)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        aria-hidden={!open}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>
            <i className="fas fa-shopping-bag" aria-hidden="true" /> Seu Carrinho
          </h3>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Fechar carrinho"
            onClick={onClose}
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <div className={styles.items}>
          {items.length === 0 ? (
            <p className={styles.empty}>
              Seu carrinho está vazio
              <br />☕ Adicione seus favoritos!
            </p>
          ) : (
            items.map((item) => (
              <div className={styles.item} key={item.id}>
                <span className={styles.itemIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemPrice}>
                    {currencyFormatter.format(item.price)}
                  </div>
                </div>
                <div className={styles.controls}>
                  <button
                    type="button"
                    aria-label={`Remover um ${item.name}`}
                    onClick={() => decrementItem(item.id)}
                  >
                    −
                  </button>
                  <span className={styles.qty}>{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Adicionar mais um ${item.name}`}
                    onClick={() => incrementItem(item.id)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    aria-label={`Remover ${item.name} do carrinho`}
                    onClick={() => removeItem(item.id)}
                  >
                    <i className="fas fa-trash" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>
            <span>Subtotal</span>
            <strong>{currencyFormatter.format(totalPrice)}</strong>
          </div>
          <button
            type="button"
            className={styles.checkoutBtn}
            disabled={items.length === 0}
            onClick={onCheckout}
          >
            <i className="fas fa-check" aria-hidden="true" /> Finalizar Pedido
          </button>
        </div>
      </aside>
    </>
  )
}
