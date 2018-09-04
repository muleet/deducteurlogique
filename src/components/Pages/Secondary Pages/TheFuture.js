import React from "react";

const TheFuture = () => {
  return (
    <main className="main-auteurs-contact">
      <h2 style={{ marginBottom: "20px" }}>
        Qu'apporteront les plus proches mises à jour ? <br />
      </h2>
      <p style={{ fontSize: 16, marginBottom: "10px" }}>
        - La possibilité de faire des hypothèses. (Et les règles ~i et ⊃i
        arriveront juste après.)
        <br />- Rendre responsive le site (au point qu'on puisse l'utiliser sur
        smartphone, c'est pas le cas actuellement).
        {/* <br />- La possibilité de créer des comptes, pour stocker les exercices
        résolus et pour créer de nouveaux exercices. */}
        {/* <br />- Un tutoriel pour apprendre l'interface du site. */}
      </p>
      <p>Dernière maj : 04/09/2018</p>
    </main>
  );
};

export default TheFuture;
