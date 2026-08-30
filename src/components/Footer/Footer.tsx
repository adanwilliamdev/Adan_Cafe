import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={`container ${styles.container}`}>
        <div>
          <a href="#" className={styles.logo}>
            <i className="fas fa-mug-hot" aria-hidden="true" />
            Adan Café
          </a>
          <p className={styles.description}>
            Cafeteria especializada em experiências sensoriais únicas.
          </p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter" aria-hidden="true" />
            </a>
            <a href="#" aria-label="YouTube">
              <i className="fab fa-youtube" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.info}>
          <h4>Horário de Funcionamento</h4>
          <ul>
            <li>
              <span>Segunda - Sexta:</span> 08:00 - 20:00
            </li>
            <li>
              <span>Sábado:</span> 09:00 - 18:00
            </li>
            <li>
              <span>Domingo:</span> 10:00 - 16:00
            </li>
          </ul>
        </div>

        <div className={styles.info}>
          <h4>Contato</h4>
          <ul>
            <li>
              <i className="fas fa-phone" aria-hidden="true" /> (11) 99999-9999
            </li>
            <li>
              <i className="fas fa-envelope" aria-hidden="true" /> contato@adancafe.com
            </li>
            <li>
              <i className="fas fa-map-marker-alt" aria-hidden="true" /> Av. Paulista,
              1000 - SP
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2026 Adan Café. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
