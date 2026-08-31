import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="footer__mark">
        <span className="footer__mark-word">Adan</span>
        <span className="footer__mark-sub">Café</span>
      </div>

      <div className="footer__grid">
        <div>
          <h3>Horário</h3>
          <p>Terça a domingo, 8h às 19h</p>
          <p>Segunda-feira fechado</p>
        </div>
        <div>
          <h3>Contato</h3>
          <p>ola@adancafe.com.br</p>
          <p>(34) 99999-0000</p>
        </div>
        <div>
          <h3>Endereço</h3>
          <p>Rua das Palmeiras, 210</p>
          <p>Centro</p>
        </div>
      </div>

      <p className="footer__note">Adan Café — grãos torrados devagar.</p>
    </footer>
  );
}
