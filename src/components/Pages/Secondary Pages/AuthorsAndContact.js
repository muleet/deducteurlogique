import React from "react";

const AuthorsAndContact = () => {
  return (
    <main className="main-auteurs-contact">
      <h2 style={{ marginBottom: "10px" }}>
        Auteur(s) et contact <br />
      </h2>
      <p style={{ fontSize: 16, marginBottom: "10px" }}>
        L'auteur du site est :{" "}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <div className="auteur anarchy">
          un·e mystérieu·x·se anticapitaliste
        </div>
      </div>
    </main>
  );
};

export default AuthorsAndContact;
