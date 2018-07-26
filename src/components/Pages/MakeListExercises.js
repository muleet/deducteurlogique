import React, { Component, Fragment } from "react";
import Exercises from "../../data/Exercises";
import { Link } from "react-router-dom";
import CalculDesPropositions from "./CalculDesPropositions";

// MakeListExercises génère sur une page, une liste d'exercices à partir des fichiers json contenant les exercices.
// MakeListExercises peut recevoir différents paramètres, et doit pouvoir s'adapter au fichier json qu'il reçoit (calcul des props, des preds, etc.)
// On accède à cette page depuis "/calcul-prop-exo" ou "/fde-exo" ou "/calcul-pred-exo".

class MakeListExercises extends Component {
  state = {
    numberExercise: "Aucun exercice sélectionné",
    arrayInfoExercise: []
  };

  renderListExercises() {
    let renderedListExercises = [];
    for (let i = 0; i < Exercises.length; i++) {
      let classNameToRender = "singleExercise";
      if (Object.keys(Exercises[i]).length !== 8) {
        classNameToRender = "disabledExercise";
      }
      renderedListExercises.push(
        <li
          className={classNameToRender}
          onMouseOver={() => {
            this.renderInfoExercises(i);
          }}
        >
          {Exercises[i].Number}
        </li>
      );
    }
    return renderedListExercises;
  }

  // Fonction méga importante qui permet de créer une str pour chaque ensemble spécifique de données, d'un exercice
  renderLiInformationExercice = array => {
    let arrayTemporary = [];
    for (let i = 0; i < array.length; i++) {
      arrayTemporary.push(array[i]);
    }
    const strToReturn = arrayTemporary.join(", ");
    return <li>{strToReturn}</li>;
  };

  renderInfoExercises = numExercise => {
    this.setState({
      numberExercise: (
        <div
          style={{ display: "flex", textAlign: "start", fontWeight: "bold" }}
        >
          Exercice {Number(Exercises[numExercise].Number)}
        </div>
      )
    });

    if (Object.keys(Exercises[numExercise]).length === 8) {
      let TitleToRender = "";
      let PremissesToRender = "(Pas de prémisses, c'est une tautologie.)";
      let RulesImpliedToRender = "(Pas de règles prédéterminées.)";

      // Si il y a un titre, on l'injecte dans les infos de l'exo
      if (Exercises[numExercise].titleForSpecificExercise) {
        TitleToRender = (
          <Fragment>
            Title : <li>{Exercises[numExercise].titleForSpecificExercise}</li>
          </Fragment>
        );
      }

      // Si il y a des prémisses, on les injecte dans les infos de l'exo
      if (Exercises[numExercise].premisses[0]) {
        PremissesToRender = (
          <Fragment>
            {this.renderLiInformationExercice(Exercises[numExercise].premisses)}
          </Fragment>
        );
      }

      // Si il y a des règles prédéterminées pour l'exo, on les injecte dans les infos de l'exo
      if (Exercises[numExercise].rulesImplied[0]) {
        RulesImpliedToRender = (
          <Fragment>
            {this.renderLiInformationExercice(
              Exercises[numExercise].rulesImplied
            )}
          </Fragment>
        );
      }

      // Compilation de toutes les données en une seule variable, qui est l'état arrayInfoExercise
      this.setState({
        arrayInfoExercise: (
          <Fragment>
            {TitleToRender}
            Prémisses : <li>{PremissesToRender}</li>
            Conclusion : <li>{Exercises[numExercise].conclusion}</li>
            {/* Signification :
            (J'ai retiré la signification possible des propositions dans la partie des infos de l'exo puisqu'osef) */}
            Règles à utiliser : {RulesImpliedToRender}
            Nombre minimal de lignes :{" "}
            <li>{Exercises[numExercise].minimalLine}</li>
          </Fragment>
        )
      });
    } else {
      this.setState({
        arrayInfoExercise: <li>"Exercice vide, pour tester la page"</li>
      });
    }
    return (
      <Fragment>
        <Link
          to="/calcul-prop"
          path="/calcul-prop"
          components={CalculDesPropositions}
        >
          {this.state.arrayInfoExercise}
        </Link>
      </Fragment>
    );
  };

  render() {
    return (
      <main className="main-exercises">
        {this.setState.numberExercise}
        <ul className="listExercises">{this.renderListExercises()}</ul>
        <ul className="box-info-exercise">
          {this.state.numberExercise}
          {this.state.arrayInfoExercise}
        </ul>
      </main>
    );
  }
}

export default MakeListExercises;
