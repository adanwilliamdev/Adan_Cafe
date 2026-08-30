import { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../hooks/useTheme'
import styles from './Header.module.css'

/** Pequeno "pop" no badge do carrinho toda vez que a contagem muda. */
function CartBadge({ count }: { count: number }) {
  return (
    <span
      key={count}
      className={`${styles.cartBadge} ${count > 0 ? styles.cartBadgePop : ''}`}
      aria-hidden="true"
    >
      {count}
    </span>
  )
}

const NAV_LINKS = [
  { href: '#hero', label: 'Início' },
  { href: '#menu', label: 'Menu' },
  { href: '#footer', label: 'Contato' },
]

interface HeaderProps {
  onOpenCart: () => void
}

export function Header({ onOpenCart }: HeaderProps) {
  const { totalItems } = useCart()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      id="header"
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
    >
      <div className={`container ${styles.container}`}>
        <a href="#hero" className={styles.logo} aria-label="Adan Café">
          <i className="fas fa-mug-hot" aria-hidden="true" />
          <span>Adan</span>&nbsp;Café
        </a>

        <nav
          className={mobileOpen ? styles.navOpen : styles.nav}
          aria-label="Navegação principal"
        >
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            onClick={toggleTheme}
          >
            <i
              className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            aria-label={`Abrir carrinho, ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`}
            onClick={onOpenCart}
          >
            <i className="fas fa-shopping-bag" aria-hidden="true" />
            <CartBadge count={totalItems} />
          </button>

          <button
            type="button"
            className={styles.mobileMenuBtn}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <i
              className={mobileOpen ? 'fas fa-times' : 'fas fa-bars'}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  )
}
