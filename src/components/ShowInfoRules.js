import React, { Component, Fragment } from "react";
import Rules from "../data/InfoRules";

class ShowInfoRules extends Component {
  state = {
    numberRule: "",
    arrayInfoRule: []
  };

  // On crée la liste des li qui contiennent chacun une règle, et on l'organise.
  renderListRules() {
    let renderedListRules = [];
    for (let i = 0; i < Rules.length; i++) {
      let classNameToRender =
        "single-rule " + Rules[i].available + "-available-rule";
      renderedListRules.push(
        <li
          key={i}
          className={classNameToRender}
          onMouseOver={() => {
            this.renderInfoRule(i);
            // On appelle la fonction renderInfoRule() qui va permettre de donner à chaque li contenant une règle, la propriété de pouvoir afficher (quand on met sa souris sur le li) des infos dans une box à droite
          }}
        >
          {Rules[i].name}
        </li>
      );
    }
    return renderedListRules;
  }

  // On crée une légende expliquant les couleurs des règles (en gros les couleurs décrivent le moment où elles seront disponibles)
  makeLegendAboutColorRule() {
    const LegendAboutColorRule = (
      <Fragment>
        <li className="yes-available-rule legend-example">{"Disponible"}</li>
        <li className="soon-available-rule legend-example">
          {"Bientôt disponible"}
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

  renderInfoRule = numRule => {
    this.setState({
      numberRule: (
        <div
          style={{
            display: "flex",
            textAlign: "start",
            fontWeight: "bold"
          }}
        >
          Règle {numRule + 1} : {Rules[numRule].name}
        </div>
      )
    });

    const verbalNameToRender = <Fragment>{Rules[numRule].verbalName}</Fragment>;

    const verbalDescriptionToRender = (
      <Fragment>{Rules[numRule].verbalDescription}</Fragment>
    );

    let arrayUtilizationFormalized = [];
    if (!Rules[numRule].arrayUtilization) {
      arrayUtilizationFormalized.push(
        "Pas d'explication sur son utilisation, pour le moment"
      );
    } else {
      for (let i = 0; i < Rules[numRule].arrayUtilization.length; i++) {
        if (typeof Rules[numRule].arrayUtilization[i] === "string") {
          arrayUtilizationFormalized.push(
            <ol key={i}>
              {Number(i + 1) + ". " + Rules[numRule].arrayUtilization[i]}
            </ol>
          );
        } else if (typeof Rules[numRule].arrayUtilization[i] === "object") {
          let subArrayUtilizationFormalized = [];
          for (let j = 0; j < Rules[numRule].arrayUtilization[i].length; j++) {
            console.log(typeof Rules[numRule].arrayUtilization[i]);
            subArrayUtilizationFormalized.push(
              <ol key={j}>
                {Number(j + 1) + ". " + Rules[numRule].arrayUtilization[i][j]}
              </ol>
            );
          }
          arrayUtilizationFormalized.push(
            <li key={i} className="sub-use-of-that-rule">
              {subArrayUtilizationFormalized}
            </li>
          );
        }
      }
      // for (let i = 0; i < Rules[numRule].arrayUtilization.length; i++) {
      //   arrayUtilizationFormalized.push(
      //     <ol key={i}>
      //       {Number(i + 1) + ". " + Rules[numRule].arrayUtilization[i]}
      //     </ol>
      //   );
      // }
    }

    // Compilation de toutes les données en une seule variable, qui est l'état arrayInfoRule
    this.setState({
      arrayInfoRule: (
        <Fragment>
          <div className="title-rule">{verbalNameToRender}</div>
          <section style={{ display: "flex", flexDirection: "row" }}>
            <div className="semi-box-info-rule">
              <p className="category-name">Description : </p>
              <li>{verbalDescriptionToRender}</li>
            </div>
            <hr />
            <div className="semi-box-info-rule">
              <p className="category-name">Comment l'utiliser : </p>
              <ul className="how-to-use-that-rule">
                {arrayUtilizationFormalized}
              </ul>
            </div>
          </section>
        </Fragment>
      )
    });

    return <Fragment>{this.state.arrayInfoRule}</Fragment>;
  };

  render() {
    return (
      <main className="main-rules-info">
        <ul className="list-rules">{this.renderListRules()}</ul>
        <ul className="box-info-rule">
          {this.state.numberRule}
          {this.state.arrayInfoRule}
        </ul>
        <ul className="legend-about-colors">
          {this.makeLegendAboutColorRule()}
        </ul>
      </main>
    );
  }
}

export default ShowInfoRules;
