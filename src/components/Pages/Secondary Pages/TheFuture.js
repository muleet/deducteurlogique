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
        Qu'apporteront les prochaines mises à jour ? <br />
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
            Un système de comptes utilisateur pour créer des exos, savoir quels
            exos on a résolus etc.
          </p>
          <p className="soon-available-rule">
            Versions alternatives des règles ⊃e (contraposition) et ∨e
            (syllogisme disjonctif).
          </p>
          <p className="later-available-rule">- Les règles modales.</p>
          <p className="maybenever-available-rule">
            - Les règles des prédicats.
          </p>
          {/* <p className="soon-available-rule">
            - La possibilité de créer des comptes utilisateurs, pour stocker les
            exercices résolus par un utilisateur et pour lui permettre de créer
            de nouveaux exercices (il pourra choisir les prémisses, les règles
            utilisées, la conclusion, une solution possible, et les
            significations possibles des prémisses).
          </p>
          <p className="soon-available-rule">
            - La possibilité pour un utilisateur, de créer des exercices
            relatifs aux raisonnements fallacieux. Par exemple la phrase "La
            France, tu l'aimes ou tu la quittes" est au moins un faux dilemme et
            un appel à l'émotion, le but de l'exercice serait de trouver que
            c'est le cas.
          </p>
          <p className="soon-available-rule">
            - Des schémas pour indiquer quels genre d'arguments sont attendus
            pour chaque règle, et montrer aussi clairement que possible la
            compatibilité des règles avec les inférences en cours.
          </p>
          <p className="later-available-rule">
            - Faire un affichage plus traditionnel du niveau d'hypothèse, avec
            des traits qui s'adaptent à la longueur des hypothèses.
          </p>
          <p className="later-available-rule">
            - Une meilleure interface pour la liste des exercices, notamment
            pour mettre en avant les significations possibles.
          </p>
          <p className="later-available-rule">- Les règles modales.</p>
          <p className="maybenever-available-rule">
            - Au sein de la déduction, lorsqu'on met le curseur de la souris sur
            le caractère d'une parenthèse, l'autre caractère lié à ce premier
            caractère sera affiché en subrillance, et toute la portée contenue
            entre ces parenthèses sera soulignée.
          </p>
          <p className="maybenever-available-rule">
            - Un mode "tutoriel" activable/désactivable à volonté pour tous les
            exercices, qui dira à l'utilisateur où il doit cliquer et quand. En
            suivant sans réfléchir les indications de ce tutoriel, on devra
            pouvoir faire tous les exercices du site.
          </p>
          <p className="maybenever-available-rule">
            - Dans l'interface de la déduction, il faudrait un bouton qui
            permettrait de mettre dans le presse-papier a) toutes les prémisses,
            b) la conclusion, et c) toute la déduction en cours en affichant le
            niveau d'hypothèses par des barres verticales devant chaque ligne.
          </p>
          <p className="maybenever-available-rule">
            - Au sein de la déduction, pouvoir réduire instantanément une
            inférence ayant un symbole autre que ~ et ∧, par leur équivalent
            avec ces symboles. Une petite icône sur la ligne le permettra. Par
            exemple p⊃q se réduit à ~(~p∧q).
          </p>
          <p className="maybenever-available-rule">
            Créer des raccourcis claviers pour les règles. Par exemple les
            lettres a z e r t permettront d'utiliser les 5 premières règles de
            tout exercice, et 1 2 3 4 5 permettront de référer aux 5 premières
            inférence (pour utiliser une inférence comme argument d'une règle).
          </p>
          <p className="maybenever-available-rule">
            - Laisser la possibilité à l'utilisateur d'écrire les dernières
            lignes d'une déduction (avec un "?" à la place de leur nombre), dès
            le début (pour qu'il puisse établir à l'avance le but visé dans sa
            déduction).
          </p> */}
        </div>
      </div>
    </main>
  );
};

export default TheFuture;
