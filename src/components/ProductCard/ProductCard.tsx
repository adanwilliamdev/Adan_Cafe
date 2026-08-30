import type { Product } from '../../types'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        {product.icon}
      </div>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.footer}>
        <span className={styles.price}>{currencyFormatter.format(product.price)}</span>
        <button
          type="button"
          className={styles.addBtn}
          aria-label={`Adicionar ${product.name} ao carrinho`}
          onClick={() => onAdd(product)}
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </article>
  )
}
