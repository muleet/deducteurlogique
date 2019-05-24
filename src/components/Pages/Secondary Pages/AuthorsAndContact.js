import React from "react";
import FlagAnarchy from "../../../img/flag-anarchy.png";

const AuthorsAndContact = () => {
  return (
    <main className="main-auteurs-contact">
      <h2 style={{ marginBottom: "10px" }}>
        Auteur(s) et contact <br />
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
    </main>
  );
};

export default AuthorsAndContact;
