import React from "react";
import FlagAnarchy from "../../../img/flag-anarchy.png";

const AuthorsAndContact = () => {
  return (
    <main className="main-auteurs-contact">
      <h2 style={{ marginBottom: "10px" }}>
        Auteur(s) et contact <br />
      </h2>

      <div className="blocAuteur">
        <img
          src={FlagAnarchy}
          className="anarchy-flag"
          alt="la propriété c'est le vol"
        />
        <p>un·e mystérieu·x·se anticapitaliste</p>
      </div>
      <p style={{ fontSize: 16, marginBottom: "10px" }}>
        Page de financement participatif :
        https://fr.tipeee.com/deducteur-logique
      </p>
      <p style={{ fontSize: 16, marginBottom: "10px" }}>
        Pour me contacter : quentin.vandini@gmail.com{" "}
      </p>
    </main>
  );
};

export default AuthorsAndContact;
