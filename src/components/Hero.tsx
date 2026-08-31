import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero__content">
        <p className="hero__kicker">Torrefação própria desde os primeiros grãos</p>
        <h1 className="hero__title">
          Café que pede
          <br />
          <span className="hero__title-line">
            tempo
            <svg
              className="hero__underline"
              viewBox="0 0 320 24"
              fill="none"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <path
                className="hero__underline-path"
                d="M2 16C48 4 92 22 140 12C188 2 232 20 280 10C300 6 310 8 318 12"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
          .
        </h1>
        <p className="hero__lede">
          Grãos selecionados, torrados em pequenos lotes, e chás de origem
          preparados folha por folha. Sobremesas feitas na casa, todos os dias.
        </p>
        <div className="hero__actions">
          <a className="hero__cta" href="#loja">
            Ver a loja
          </a>
          <a className="hero__cta-secondary" href="#sobre">
            Conhecer a casa
          </a>
        </div>
      </div>

      <div className="hero__mug" aria-hidden="true">
        <svg viewBox="0 0 220 220" fill="none">
          <path
            className="hero__steam"
            d="M85 40c-6 10 8 14 2 26"
            stroke="var(--text-muted)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className="hero__steam hero__steam--delay"
            d="M115 34c-6 10 8 14 2 26"
            stroke="var(--text-muted)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse cx="100" cy="150" rx="66" ry="14" fill="var(--surface-alt)" />
          <path
            d="M40 100h120l-8 58a20 20 0 0 1-20 18H68a20 20 0 0 1-20-18l-8-58Z"
            fill="var(--surface)"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
          />
          <path
            d="M160 112h10a16 16 0 0 1 0 32h-10"
            stroke="var(--border-strong)"
            strokeWidth="6"
            fill="none"
          />
          <ellipse cx="100" cy="100" rx="60" ry="10" fill="var(--accent)" opacity="0.9" />
        </svg>
      </div>
    </section>
  );
}
