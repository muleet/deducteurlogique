import React, { Fragment } from "react";
function makeLegendAboutColorRule() {
  const LegendAboutColorRule = (
    <Fragment>
      <li className="yes-available-rule legend-example">{"Disponible"}</li>
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
          <p className="yes-available-rule">
            0.67b : Versions alternatives des règles ⊃e, ⊅e (les
            contrapositions), et ≡e (permettre d'avoir A si on A≡B et B, et
            inversement). Beaucoup de corrections de vieux bugs.
          </p>
          <p className="soon-available-rule">
            0.67c : Affichage traditionnel des lignes d'hypothèse.
          </p>
          <p className="soon-available-rule">
            0.68 : Version alternative de la règle ∨e (syllogisme disjonctif).
          </p>
          <p className="soon-available-rule">
            0.68 : Pouvoir valider une inférence en cliquant sur sa
            prévisualisation. Affichage alternatif des exercices (une ligne avec
            infos détaillées par exo, plutôt qu'une grille avec tous les exos.)
          </p>
          <p className="later-available-rule">
            0.70-0.80 : Un système de comptes utilisateur pour créer des exos,
            savoir quels exos on a résolus etc.
          </p>
          <p className="later-available-rule">
            0.80-0.90 : Les règles modales.
          </p>
          <p className="maybenever-available-rule">
            0.90-1.0 : Les règles des prédicats.
          </p>
          {/* 
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
