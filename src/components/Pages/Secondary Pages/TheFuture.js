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
            - Corrections des bugs spécifiques au fonctionnement de la règle ∨e
            (et surtout, amélioration de son interface) + possibilité d'utiliser
            la suppression de la dernière inférence, avec cette règle.
          </p>
          <p className="later-available-rule">
            - Faire un affichage plus traditionnel du niveau d'hypothèse, avec
            des traits qui s'adaptent à la longueur des hypothèses.
          </p>
          <p className="later-available-rule">
            - Une meilleure interface pour la liste des exercices, notamment
            pour mettre en avant les significations possibles.
          </p>
          <p className="later-available-rule">
            - La possibilité de créer des comptes utilisateurs, pour stocker les
            exercices résolus par un utilisateur et pour lui permettre de créer
            de nouveaux exercices (il pourra choisir les prémisses, les règles
            utilisées, la conclusion, une solution possible, et les
            significations possibles des prémisses).
          </p>
          <p className="later-available-rule">- Les règles modales.</p>
          <p className="maybenever-available-rule">
            - Au sein de la déduction, pouvoir inverser à tout moment A et B
            dans des inférences ayant pour connecteur dominant un connecteur
            dont le sens n'a pas d'importance (∧, ∨, ⊻, ≡, ↓ ou ↑) en cliquant
            sur le connecteur. En mettant sa souris sur un connecteur
            commutatif, on verra la portée de celui-ci (même s'il est au sein
            d'une parenthèse). (L'action d'inverser ainsi des inférences sera
            appelé "utilisation de la règle de commutativité".)
          </p>
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
            inférence (que ce soit pour utiliser la règle reit ou pour utiliser
            une inférence comme argument d'une règle).
          </p>
          <p className="maybenever-available-rule">
            - Laisser la possibilité à l'utilisateur d'écrire les dernières
            lignes d'une déduction (avec un "?" à la place de leur nombre), dès
            le début (pour qu'il puisse établir à l'avance le but visé dans sa
            déduction).
          </p>
          <p className="maybenever-available-rule">
            - Les règles des prédicats.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TheFuture;
