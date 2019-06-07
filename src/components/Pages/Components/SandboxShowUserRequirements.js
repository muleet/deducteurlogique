import React, { Component, Fragment } from "react";

// fonction appelée par Deducer, qui envoie des props sur un exercice de logique (qui ont pour origine le fichier Exercices.json) ainsi que valueInference
class ShowInfoSandbox extends Component {
  state = {
    stateObjectExercise: {
      premisses: [],
      conclusion: "",
      conclusionReached: false,
      rulesImplied: [],
      possibleMeaning: []
    }
  };

  updateState(object) {
    this.setState({});
  }

  renderPart(type) {
    let description = "",
      checkClassName = "unchecked";
    if (type === "prem") {
      description = "Prémisse·s impliqué·e·s";
    } else if (type === "conc") {
      description = "Conclusion à atteindre";
      if (this.state.stateObjectExercise.conclusion.length > 1) {
        checkClassName = "checked";
      }
    } else if (type === "concReached") {
      description = "Déduction réussie";
    } else if (type === "rules") {
      description = "Règle·s impliqué·e·s";
    } else if (type === "meaning") {
      description = "Signification·s possible·s";
    }
    return (
      <li className="user-box-singleCondition selectable">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {description}
          {this.state.stateObjectExercise.premisses}
          <i className={"fas fa-check " + checkClassName} />
        </div>
      </li>
    );
  }

  render() {
    return (
      <Fragment>
        Données de l'exercice en cours :
        <ul className="user-box-allCondition">
          {this.renderPart("prem")}
          {this.renderPart("conc")}
          {this.renderPart("concReached")}
          {this.renderPart("rules")}
          {this.renderPart("meaning")}
        </ul>
      </Fragment>
    );
  }
}
export default ShowInfoSandbox;
