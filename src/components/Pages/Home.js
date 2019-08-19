import React, { Component, Fragment } from "react";
// Importation de mes composants
import ButtonMenu from "../Navigation Components/ButtonMenu";
import ShowInfoRules from "./ShowInfoRules";
import MakeListExercises from "./MakeListExercises.js";
import FormalisationEnonces from "./FormalisationEnonces";
// import CalculDesPredicats from "./CalculDesPredicats";
import Linker from "../Navigation Components/Linker";
import CalculDesPredicats from "./CalculDesPredicats";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <main className="main-menu">
          <div className="info-button-menu-list">
            <Linker
              link="/questions"
              path="/questions"
              components={ShowInfoRules}
              name={
                <ButtonMenu
                  className="info-color info-button-menu"
                  name={"Questions sur la logique"}
                />
              }
            />
            <Linker
              link="/règles"
              path="/règles"
              components={ShowInfoRules}
              name={
                <ButtonMenu
                  className="info-color info-button-menu"
                  name={"Règles d'inférence"}
                />
              }
            />
            <Linker
              link="/table-de-vérité"
              path="/table-de-vérité"
              components={ShowInfoRules}
              name={
                <ButtonMenu
                  className="info-color info-button-menu"
                  name={"Table de vérité"}
                />
              }
            />
          </div>
          <Linker
            link="/calcul-prop-exo"
            path="/calcul-prop-exo"
            components={MakeListExercises}
            name={
              <ButtonMenu
                className="prop-color"
                name="Calcul des propositions"
              />
            }
          />
          <Linker
            link="/fde"
            path="/fde"
            components={FormalisationEnonces}
            name={
              <ButtonMenu
                className="forma-color unavailable-yet"
                name="Formalisation des énoncés"
              />
            }
          />
          <Linker
            link="/calcul-pred"
            path="/calcul-pred"
            components={CalculDesPredicats}
            name={
              <ButtonMenu
                className="pred-color unavailable-yet"
                name="Calcul des prédicats"
              />
            }
          />
        </main>
      </Fragment>
    );
  }
}

export default Home;
