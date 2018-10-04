import React from "react";
import FlagAnarchy from "../../../img/flag-anarchy.png";

const AuthorsAndContact = () => {
  return (
    <main className="main-auteurs-contact">
      <h2 style={{ marginBottom: "10px" }}>
        Auteur(s) et contact <br />
      </h2>
      <p style={{ fontSize: 16, marginBottom: "10px" }}>
        L'auteur du site est :{" "}
      </p>
      <div className="blocAuteur">
        <img
          src={FlagAnarchy}
          className="anarchy-flag"
          alt="la propriété c'est le vol"
        />
        <p>un·e mystérieu·x·se anticapitaliste</p>
      </div>
    </main>
  );
};

export default AuthorsAndContact;
