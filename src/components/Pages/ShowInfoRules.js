import React, { Component, Fragment } from "react";
import Rules from "../../data/InfoRules";

class ShowInfoRules extends Component {
  state = {
    numberRule: "",
    arrayInfoRule: []
  };

  // On crée la liste des li qui contiennent chacun une règle, et on l'organise.
  renderListRules() {
    let renderedListRules = [];
    for (let i = 0; i < Rules.length; i++) {
      renderedListRules.push(
        <li
          key={i}
          className={"single-rule " + Rules[i].available + "-available-rule"}
          onMouseOver={() => {
            this.renderInfoRule(Rules[i]);
            // On appelle la fonction renderInfoRule() qui va permettre de donner à chaque li contenant une règle, la propriété de pouvoir afficher (quand on met sa souris sur le li) des infos dans une box à droite
          }}
        >
          {Rules[i].name}
        </li>
      );
      if (Rules[i].otherInterpretation) {
        renderedListRules.push(
          <li
            key={i + 100}
            className={
              "single-rule " +
              Rules[i].otherInterpretation.available +
              "-available-rule"
            }
            onMouseOver={() => {
              this.renderInfoRule(Rules[i].otherInterpretation);
              // On appelle la fonction renderInfoRule() qui va permettre de donner à chaque li contenant une règle, la propriété de pouvoir afficher (quand on met sa souris sur le li) des infos dans une box à droite
            }}
          >
            {Rules[i].otherInterpretation.name}
          </li>
        );
      }
    }
    return renderedListRules;
  }

  // On crée une légende expliquant les couleurs des règles (en gros les couleurs décrivent le moment où elles seront disponibles)
  makeLegendAboutColorRule() {
    const LegendAboutColorRule = (
      <Fragment>
        <li className="yes-available-rule legend-example">{"Disponible"}</li>
        <li className="soon-available-rule legend-example">
          {"Prochains ajouts"}
        </li>
        <li className="later-available-rule legend-example">{"Plus tard"}</li>
        <li className="maybenever-available-rule legend-example">
          {"Bien plus tard"}
        </li>
      </Fragment>
    );
    return LegendAboutColorRule;
  }

  // Fonction méga importante qui permet de créer une str pour chaque ensemble spécifique de données, d'une règle
  renderLiInformationRule = array => {
    let arrayTemporary = [];
    for (let i = 0; i < array.length; i++) {
      arrayTemporary.push(array[i]);
    }
    const strToReturn = arrayTemporary.join(", ");
    return <li>{strToReturn}</li>;
  };

  renderInfoRule = Rule => {
    this.setState({
      numberRule: (
        <div
          style={{
            display: "flex",
            textAlign: "start",
            fontWeight: "bold",
            fontSize: 20
          }}
        >
          Règle : {Rule.name}
        </div>
      )
    });

    const verbalNameToRender = <Fragment>{Rule.verbalName}</Fragment>;

    const verbalDescriptionToRender = (
      <Fragment>{Rule.verbalDescription}</Fragment>
    );

    let arrayUtilizationFormalized = [];
    if (!Rule.arrayUtilization) {
      arrayUtilizationFormalized.push(
        "Pas d'explication sur son utilisation, pour le moment"
      );
    } else {
      for (let i = 0; i < Rule.arrayUtilization.length; i++) {
        if (typeof Rule.arrayUtilization[i] === "string") {
          arrayUtilizationFormalized.push(
            <ol className="inference-example-rule" key={i}>
              {Number(i + 1) + ". " + Rule.arrayUtilization[i]}
            </ol>
          );
        } else if (typeof Rule.arrayUtilization[i] === "object") {
          let subArrayUtilizationFormalized = [];
          for (let j = 0; j < Rule.arrayUtilization[i].length; j++) {
            subArrayUtilizationFormalized.push(
              <ol className="inference-example-rule" key={j}>
                {Number(j + 1) + ". " + Rule.arrayUtilization[i][j]}
              </ol>
            );
          }
          arrayUtilizationFormalized.push(
            <ul key={i} className="sub-use-of-that-rule">
              {subArrayUtilizationFormalized}
            </ul>
          );
        }
      }
    }
    let latinName = "";
    if (Rule.latinName) {
      latinName = <p className="latin-name">{Rule.latinName}</p>;
    }

    // Compilation de toutes les données en une seule variable, qui est l'état arrayInfoRule
    this.setState({
      arrayInfoRule: (
        <Fragment>
          <div className="title-rule">{verbalNameToRender}</div>
          {latinName}
          <section style={{ display: "flex", flexDirection: "row" }}>
            <div className="semi-box-info-rule">
              <p className="category-name">Description : </p>
              <span>{verbalDescriptionToRender}</span>
            </div>
            <hr />
            <div className="semi-box-info-rule">
              <p className="category-name">Comment l'utiliser : </p>
              <div className="how-to-use-that-rule">
                {arrayUtilizationFormalized}
              </div>
            </div>
          </section>
        </Fragment>
      )
    });

    return <Fragment>{this.state.arrayInfoRule}</Fragment>;
  };

  render() {
    return (
      <div>
        <h2>Règles d'inférence</h2>
        <main className="main-rules-info">
          <ul className="legend-about-colors">
            {this.makeLegendAboutColorRule()}
          </ul>
          <ul className="list-rules">{this.renderListRules()}</ul>
          <ul className="box-info-rule">
            {this.state.numberRule}
            {this.state.arrayInfoRule}
          </ul>
        </main>
      </div>
    );
  }
}

export default ShowInfoRules;
