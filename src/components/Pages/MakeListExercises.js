import React, { Component, Fragment } from "react";
import Exercises from "../../data/Exercises";
import { Link } from "react-router-dom";

// MakeListExercises génère sur une page, une liste d'exercices à partir des fichiers json contenant les exercices.
// MakeListExercises peut recevoir des props différentes, et doit pouvoir s'adapter au fichier json qu'il reçoit (calcul des props, des preds, etc.)
// Le composant MakeListExercises est appelé depuis "/calcul-prop-exo" ou "/fde-exo" ou "/calcul-pred-exo".

class MakeListExercises extends Component {
  state = {
    numberExercise: (
      <div style={{ textAlign: "center" }}>Aucun exercice sélectionné</div>
    ),
    arrayInfoExercise: []
  };

  renderListExercises() {
    let renderedListExercises = [];
    for (let i = 0; i < Exercises.length; i++) {
      let classNameToRender = "single-exercise";
      if (Object.keys(Exercises[i]).length !== 7) {
        classNameToRender = "disabled-exercise";
      }
      renderedListExercises.push(
        <Link
          key={i}
          to={"/calcul-prop/" + Number(i + 1)}
          path="/calcul-prop"
          // component={CalculDesPropositions} // ce truc-là ne sert à rien je crois (le composant de cette url est déjà défini dans App, il me semble)
        >
          <li
            className={classNameToRender}
            onMouseOver={() => {
              this.renderInfoExercises(i);
            }}
          >
            {Number(i + 1)}
          </li>
        </Link>
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
    return <Fragment>{strToReturn}</Fragment>;
  };

  renderInfoExercises = numExercise => {
    this.setState({
      numberExercise: (
        <div
          style={{
            display: "flex",
            textAlign: "start",
            fontWeight: "bold",
            marginBottom: "10px"
          }}
        >
          Exercice {numExercise + 1}
        </div>
      )
    });

    if (Object.keys(Exercises[numExercise]).length === 7) {
      let TitleToRender = "";
      let PremissesToRender = "(Pas de prémisses, c'est une tautologie.)";
      let RulesImpliedToRender = "(Pas de règles prédéterminées.)";

      // Si il y a un titre, on l'injecte dans les infos de l'exo
      if (Exercises[numExercise].verbalName) {
        TitleToRender = (
          <Fragment>
            Titre : <li>{Exercises[numExercise].verbalName}</li>
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
            Règles à utiliser : <li>{RulesImpliedToRender}</li>
            Nombre minimal de lignes :
            <li>{Exercises[numExercise].minimalLine}</li>
          </Fragment>
        )
      });
    } else {
      this.setState({
        arrayInfoExercise: <li>"Exercice vide, pour tester la page"</li>
      });
    }
    return <Fragment>{this.state.arrayInfoExercise}</Fragment>;
  };

  render() {
    return (
      <main className="main-exercises">
        <ul className="list-exercises">{this.renderListExercises()}</ul>
        <ul className="box-info-exercise">
          {this.state.numberExercise}
          {this.state.arrayInfoExercise}
        </ul>
      </main>
    );
  }
}

export default MakeListExercises;
