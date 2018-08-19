import React, { Fragment } from "react";
import LocutionsLatines from "../data/LocutionsLatines.json";
import LocutionsGrecques from "../data/LocutionsGrecques.json";

function MakeLocution() {
  function NoteOuAuteur(totalSentence, random) {
    let noteOuAuteur = "";
    if (totalSentence[random].note) {
      noteOuAuteur = (
        <div id="auteur-et-note">{"(" + totalSentence[random].note + ")"}</div>
      );
    } else if (totalSentence[random].auteur) {
      noteOuAuteur = (
        <div id="auteur-et-note">{totalSentence[random].auteur}</div>
      );
    }
    return noteOuAuteur;
  }

  let random = Math.floor(
    Math.random() * Number(LocutionsLatines.length + LocutionsGrecques.length)
  );
  let totalSentence = [...LocutionsLatines];
  let finalLocution = "";

  for (let i = 0; i < Number(LocutionsGrecques.length); i++) {
    totalSentence.push(LocutionsGrecques[i]);
  }
  if (totalSentence[random].latin) {
    finalLocution = (
      <ul>
        <li id="locution">{totalSentence[random].latin}</li>
        {NoteOuAuteur(totalSentence, random)}
        <li id="traduction-locution">{totalSentence[random].traduction}</li>
      </ul>
    );
  } else if (totalSentence[random].grec) {
    finalLocution = (
      <ul>
        <li id="locution">{totalSentence[random].grec}</li>
        <li id="alphabetlatin">
          {"[" + totalSentence[random].alphabetlatin + "]"}
        </li>
        {NoteOuAuteur(totalSentence, random)}
        <li id="traduction-locution">{totalSentence[random].traduction}</li>
      </ul>
    );
  }

  // <div
  //   style={{
  //     display: "flex",
  //     flexDirection: "column"
  //   }}
  // >
  {
    /* <i
        id="feather"
        class="fas fa-feather-alt icon"
        onClick={() => {
          MakeLocution();
        }}
      /> */
  }
  return finalLocution;
  // </div>
}

export default MakeLocution;
