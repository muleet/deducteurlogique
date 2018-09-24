import React from "react";

const TheFuture = () => {
  return (
    <main className="main-auteurs-contact">
      <h2 style={{ marginBottom: "20px" }}>
        Qu'apporteront les plus proches mises à jour ? <br />
      </h2>
      <p style={{ fontSize: 16, marginBottom: "10px" }}>
        <br />
        (bientôt) Les règles de disjonction et d'implication, et des exercices
        associés.
        <br />
        (dans pas longtemps) Rendre le site plus user-friendly, avec des
        messages situationnels guidant l'utilisateur.
        <br />
        (dans pas longtemps) Rendre responsive le site (au point qu'on puisse
        l'utiliser facilement sur smartphone).
        <br /> (plus tard) Faire un affichage du niveau d'hypothèse, avec des
        traits plus ou moins longs.
        <br /> (plus tard) Laisser la possibilité à l'utilisateur d'écrire les
        dernières lignes d'une déduction (avec un "?" à la place de leur
        nombre), dès le début (pour qu'il puisse établir à l'avance le but visé
        dans sa déduction).
        {/* <br />- La possibilité de créer des comptes, pour stocker les exercices
        résolus et pour créer de nouveaux exercices. */}
      </p>
    </main>
  );
};

export default TheFuture;
