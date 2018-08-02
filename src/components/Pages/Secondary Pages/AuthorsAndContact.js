import React from "react";

const AuthorsAndContact = () => {
  return (
    <main className="main-auteurs-contact">
      <h2 style={{ marginBottom: "50px", marginTop: "20px" }}>
        Auteur(s) et contact
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <div className="auteur anarchy">
          un·e mystérieu·x·se anticapitaliste,<br />nommé·e Camille Dupont
        </div>
      </div>
    </main>
  );
};

export default AuthorsAndContact;
