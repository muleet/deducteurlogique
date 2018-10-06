import React, { Fragment } from "react";
function makeLegendAboutColorRule() {
  const LegendAboutColorRule = (
    <Fragment>
      {/* <li className="yes-available-rule legend-example">{"Disponible"}</li> */}
      <li className="soon-available-rule legend-example">
        {"Prochains ajouts"}
      </li>
      <li className="later-available-rule legend-example">{"Plus tard"}</li>
      <li className="maybenever-available-rule legend-example">
        {"Bien plus tard"}
      </li>
    </Fragment>
  );
  return LegendAboutColorRule;
}
const TheFuture = () => {
  return (
    <main className="main-auteurs-contact">
      <h2 style={{ marginBottom: "20px" }}>
        Qu'apporteront les plus proches mises à jour ? <br />
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          fontSize: 16
        }}
      >
        <ul
          className="legend-about-colors"
          style={{
            marginRight: "10px",
            justifyContent: "center"
          }}
        >
          {makeLegendAboutColorRule()}
        </ul>
        <div
          style={{
            marginBottom: "10px"
          }}
        >
          <p className="soon-available-rule">
            - Les règles de disjonction, celles du biconditionnel, et celles de
            la contraposée du conditionnel. (Et des exercices associés pour
            chacun.)
          </p>
          <p className="soon-available-rule">
            - Rendre le site plus user-friendly, avec des messages situationnels
            guidant l'utilisateur.
          </p>
          <p className="soon-available-rule">
            - Rendre responsive le site (au point qu'on puisse l'utiliser
            facilement sur smartphone).
          </p>
          <p className="later-available-rule">
            - Faire un affichage plus traditionnel du niveau d'hypothèse, avec
            des traits qui s'adaptent à la longueur des hypothèses.
          </p>
          <p className="maybenever-available-rule">
            - La possibilité de créer des comptes utilisateurs, pour stocker les
            exercices résolus par un utilisateur et pour lui permettre de créer
            de nouveaux exercices (il pourra choisir les prémisses, les règles
            utilisées, la conclusion, une solution possible, et les
            significations possibles).
          </p>
          <p className="maybenever-available-rule">
            - Laisser la possibilité à l'utilisateur d'écrire les dernières
            lignes d'une déduction (avec un "?" à la place de leur nombre), dès
            le début (pour qu'il puisse établir à l'avance le but visé dans sa
            déduction).
          </p>
          <p className="maybenever-available-rule">
            - Des diagrammes de Venn dans la page de la table de vérité, un par
            possibilité.
          </p>
          <p className="maybenever-available-rule">
            - Au sein de la déduction, pouvoir inverser à tout moment A et B
            dans des inférences ayant pour connecteur dominant un connecteur
            dont le sens n'a pas d'importance (∧, ∨, ⊻, ≡, ↓ ou |) en cliquant
            dessus.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TheFuture;
