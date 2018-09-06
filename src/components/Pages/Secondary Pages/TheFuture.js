import React from "react";

const TheFuture = () => {
  return (
    <main className="main-auteurs-contact">
      <h2 style={{ marginBottom: "20px" }}>
        Qu'apporteront les plus proches mises à jour ? <br />
      </h2>
      <p style={{ fontSize: 16, marginBottom: "10px" }}>
        - La possibilité de faire des hypothèses. (Et les règles ~i et ⊃i
        arriveront juste après.) (Edit : c'est presque terminé mais il faut
        encore que j'empêche l'utilisateur d'utiliser des prémisses en dehors de
        l'hypothèse en cours.)
        <br />- Rendre le site plus user-friendly.
        <br />- Rendre responsive le site (au point qu'on puisse l'utiliser sur
        smartphone, c'est pas le cas actuellement).
        {/* <br />- La possibilité de créer des comptes, pour stocker les exercices
        résolus et pour créer de nouveaux exercices. */}
      </p>
      <p style={{ fontSize: 16, marginBottom: "10px" }}>
        Dernières majs :<br />- 05/09/2018 : la règle ⊃i fonctionne mais autour
        de plusieurs bugs + ajout d'un nouvel exercice 4, "Validation
        d'hypothèse", qui peut être terminé avec les règles actuelles.
        <br />- 06/09/2018 : ajout de la règle ~i et d'un début d'informations
        pour l'utilisateur, qui apparaissent dans certaines situations
        (notamment s'il y a une erreur dans l'utilisation d'une règle). Les
        exercices 5, 6, 7 peuvent être terminés (en respectant les règles de
        logique, mais aussi en trichant via un bug que je dois régler :
        l'utilisation pour ~i et ⊃i des inférences hors de l'hypothèse en
        cours).
      </p>
    </main>
  );
};

export default TheFuture;
