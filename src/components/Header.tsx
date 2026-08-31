import "./Header.css";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="header">
      <a className="header__mark" href="#topo">
        <span className="header__mark-word">Adan</span>
        <span className="header__mark-sub">Café</span>
      </a>

      <nav className="header__nav" aria-label="Navegação principal">
        <a href="#sobre">Sobre</a>
        <a href="#loja">Loja</a>
        <a href="#contato">Contato</a>
      </nav>

      <button className="header__cart" onClick={onCartClick} aria-label="Abrir sacola">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M5 6h10l-.8 8.4a2 2 0 0 1-2 1.8H7.8a2 2 0 0 1-2-1.8L5 6Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M7.2 6V5a2.8 2.8 0 0 1 5.6 0v1" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span>Sacola</span>
        {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
      </button>
    </header>
  );
}
