import "./About.css";

export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="about__row">
        <h2 className="about__title">Da torra ao coado, feito por perto</h2>
        <p className="about__text">
          A Adan nasceu de um torrador pequeno e uma vontade grande: servir
          café que ainda lembra da fazenda de onde veio. Torramos em lotes de
          poucos quilos, provamos cada remessa e trocamos o cardápio conforme
          a safra. Os chás seguem o mesmo cuidado — folhas inteiras, infusões
          cronometradas. As sobremesas saem do forno da casa todas as manhãs.
        </p>
      </div>
      <dl className="about__facts">
        <div>
          <dt>Torra</dt>
          <dd>Lotes de 5 kg, três vezes por semana</dd>
        </div>
        <div>
          <dt>Chás</dt>
          <dd>Folha inteira, sem aromatizantes artificiais</dd>
        </div>
        <div>
          <dt>Sobremesas</dt>
          <dd>Feitas na cozinha da casa, todos os dias</dd>
        </div>
      </dl>
    </section>
  );
}
