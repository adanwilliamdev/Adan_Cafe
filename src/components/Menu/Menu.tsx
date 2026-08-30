import { useMemo, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useProducts } from '../../hooks/useProducts'
import type { Category, Product } from '../../types'
import { ProductCard } from '../ProductCard/ProductCard'
import styles from './Menu.module.css'

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'coffees', label: 'Cafés Especiais', icon: 'fas fa-mug-hot' },
  { id: 'teas', label: 'Chás Artesanais', icon: 'fas fa-leaf' },
  { id: 'sweets', label: 'Doces Finos', icon: 'fas fa-cake-candles' },
]

interface MenuProps {
  onAddToCart: (product: Product) => void
}

export function Menu({ onAddToCart }: MenuProps) {
  const { products, loading, error } = useProducts()
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState<Category>('coffees')

  const visibleProducts = useMemo(
    () => products.filter((product) => product.category === activeCategory),
    [products, activeCategory]
  )

  function handleAdd(product: Product) {
    addItem(product)
    onAddToCart(product)
  }

  return (
    <section className={styles.menu} id="menu">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            Nosso <span>Menu</span>
          </h2>
          <p className={styles.description}>
            Selecionamos os melhores grãos, folhas e ingredientes para você.
          </p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Categorias do menu">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`${styles.tabBtn} ${
                activeCategory === category.id ? styles.tabBtnActive : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <i className={category.icon} aria-hidden="true" /> {category.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className={styles.skeletonGrid} aria-hidden="true">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.skeletonCard} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className={styles.state} role="alert">
            <p>😕 {error}</p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className={styles.grid} role="tabpanel">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
