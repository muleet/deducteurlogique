import React from "react";
import FlagAnarchy from "../../../img/flag-anarchy.png";

const AuthorsContactAndSources = () => {
  return (
    <main className="main-auteurs-contact">
      <h2 style={{ marginBottom: "10px" }}>
        Auteur(s), contact et sources <br />
      </h2>
      <div className="blocAuteur" style={{ display: "flex" }}>
        <img
          src={FlagAnarchy}
          className="anarchy-flag"
          alt="la propriété c'est le vol"
          style={{ display: "flex" }}
        />
        <p>
          {/* Page de financement participatif : <br />
          <a
            href="https://fr.tipeee.com/deducteur-logique"
            // style={{ color: "" }}
          >
            https://fr.tipeee.com/deducteur-logique
          </a>
          <br /> */}
          <br />
          Pour me contacter :
          <br />
          quentin.vandini@gmail.com
        </p>
      </div>
      <div style={{ fontSize: "17px" }}>
        <br />
        Les sources sur lesquelles je me suis appuyé pour définir la logique sur
        ce site :<br />- Les cours de logique de l'UFR de philosophie de
        l'Université de Rennes 1<br />
        - De nombreux articles anglais et français de Wikipédia
        <br />
        - yourlogicalfallacyis.com
        <br />- toolkitforthinking.com
        <br />- F.Lepage (2010), <i>Éléments de logique contemporaine</i>,
        Montréal, éd. Presses Universitaires de Montréal, coll. Paramètres, 276
        pages.
      </div>
    </main>
  );
};

export default AuthorsContactAndSources;
