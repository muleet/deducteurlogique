import React, { Fragment } from "react";
import LocutionsLatines from "../data/LocutionsLatines.json";
import LocutionsGrecques from "../data/LocutionsGrecques.json";

function MakeLocution() {
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
      <div>
        <div id="locution">{totalSentence[random].latin}</div>
        {NoteOuAuteur(totalSentence, random)}
        <div id="traduction-locution">{totalSentence[random].traduction}</div>
      </div>
    );
  } else if (totalSentence[random].grec) {
    finalLocution = (
      <Fragment>
        <div id="locution">{totalSentence[random].grec}</div>
        <div id="alphabetlatin">
          {"[" + totalSentence[random].alphabetlatin + "]"}
        </div>
        {NoteOuAuteur(totalSentence, random)}
        <div id="traduction-locution">{totalSentence[random].traduction}</div>
      </Fragment>
    );
  }
  return finalLocution;
}

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

export default MakeLocution;
