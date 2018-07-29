import React from "react";

const AuthorsAndContact = () => {
  return (
    <main
    // className="main-auteurs-contact"
    >
      <h2>Auteur(s) et contact</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <div className="main-auteurs-contact anarchy">
          un mystérieux anticapitaliste
        </div>
      </div>
    </main>
  );
};

export default AuthorsAndContact;
